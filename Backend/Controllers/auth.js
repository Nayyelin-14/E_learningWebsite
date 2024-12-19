const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const db = require("../db/db");
const { users, emailVerification } = require("../db/schema");
const { eq } = require("drizzle-orm");
const {
  create_verificationToken,
  Check_verification_token,
} = require("./token");
const { sendVerificationEmail } = require("../Action/EmailAction");
const {
  UserSchema,
  RegisterSchema,
  LoginSchema,
} = require("../types/UserSchema");

// Import the Zod schema

// Controller function for user registration
exports.registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const validatedData = RegisterSchema.safeParse(req.body);

    // Check if validation was successful
    if (!validatedData.success) {
      return res.status(400).json({
        isSuccess: false,
        message: "Validation failed",
        errors: validatedData.error.errors,
      });
    }
    if (validatedData.success) {
      const { username, email, password } = validatedData.data;

      // Check if the user already exists
      const existed_userDoc = await db
        .select()
        .from(users)
        .where(eq(users.user_email, email));

      if (existed_userDoc.length > 0) {
        if (!existed_userDoc[0].emailVerified) {
          await db
            .delete(emailVerification)
            .where(eq(existed_userDoc[0].user_email, email));
          const verificationToken = await create_verificationToken(
            existed_userDoc[0].user_email
          );

          await sendVerificationEmail(
            verificationToken[0].user_email,
            verificationToken[0].verification_token,
            username
          );
          return res.status(200).json({
            isSuccess: true,
            message:
              "The email address you entered is already in use and email verification resent!!!",
          });
        }
        return res.status(400).json({
          isSuccess: false,
          message: "The email address you entered is already in use",
        });
      }
      //

      // Insert new user into the database

      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await db.insert(users).values({
        user_name: username,
        user_email: email,
        user_password: hashedPassword,
        created_at: new Date(),
      });

      const verificationToken = await create_verificationToken(email);
      // console.log(verificationToken);
      // console.log("token", verificationToken[0].user_email);

      await sendVerificationEmail(
        verificationToken[0].user_email,
        verificationToken[0].verification_token,
        username
      );
      return res.status(200).json({
        isSuccess: true,
        message: "Verification email sent. ",
      });
      // Retrieve the current user (just inserted)
      const currentUser = await db
        .select()
        .from(users)
        .where(eq(users.user_email, email));

      // Respond with the new user details
      return res.status(201).json({
        isSuccess: true,
        message: "User successfully registered",
        currentUser: currentUser[0],
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      isSuccess: false,
      message: "An error occurred during registration",
    });
  }
};
///check verify email
exports.emailConfirmwithToken = async (req, res) => {
  const { token } = req.params;

  const existedToken = await Check_verification_token(null, token);

  if (!existedToken || existedToken.length === 0) {
    return res.status(400).json({
      isSuccess: false,
      message: "Something went wrong",
    });
  }

  const isExpired = new Date() > new Date(existedToken[0].expires);
  if (isExpired) {
    return res.status(400).json({
      isSuccess: false,
      message: "Verification failed. Please try again.",
    });
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.user_email, existedToken[0].user_email));
  if (!existingUser) {
    return res.status(400).json({
      isSuccess: false,
      message: "Something went wrong",
    });
  }

  await db
    .update(users)
    .set({
      emailVerified: new Date(),
      email: existedToken.user_email,
    })
    .where(eq(users.user_id, existingUser[0].user_id));

  // delete after verified
  await db
    .delete(emailVerification)
    .where(
      eq(emailVerification.verification_id, existedToken[0].verification_id)
    );

  return res.status(200).json({
    isSuccess: true,
    message: "Your account has been successfully verified!",
  });
};

// Controller function for login
exports.LoginUser = async (req, res) => {
  try {
    const validatedData = LoginSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        isSuccess: false,
        message: "Validation failed",
        errors: validatedData.error.errors,
      });
    }
    if (validatedData.success) {
      const { email, password } = validatedData.data;

      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.user_email, email));

      if (existingUser.length === 0) {
        return res.status(400).json({
          isSuccess: false,
          message: "Invalid credentials",
        });
      }

      const isMatch = await bcrypt.compare(
        password,
        existingUser[0].user_password
      );

      if (!isMatch) {
        return res.status(400).json({
          isSuccess: false,
          message: "Invalid credentials",
        });
      }

      if (!existingUser[0].emailVerified) {
        const verificationToken = await create_verificationToken(email);

        await sendVerificationEmail(
          verificationToken[0].user_email,
          verificationToken[0].verification_token,
          existingUser[0].user_name
        );
        return res.status(400).json({
          isSuccess: false,
          isunVerified: true,
          message: "Please verify your account first!!!",
        });
      }

      const JWT_token = jwt.sign(
        { userId: existingUser[0].user_id },
        process.env.JWT_KEY,
        { expiresIn: "1d" }
      );

      // Assign token for user in the database
      await db
        .update(users)
        .set({ user_token: JWT_token })
        .where(eq(users.user_email, email));

      return res.status(200).json({
        isSuccess: true,
        message: "Successfully Logged In",
        token: JWT_token,
        loginUser: existingUser[0],
      });
    }
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
