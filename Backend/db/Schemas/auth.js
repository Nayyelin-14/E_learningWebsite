// db/schema/users.js

const { createId } = require("@paralleldrive/cuid2");
const { primaryKey } = require("drizzle-orm/mysql-core");
const {
  mysqlTable,
  int,
  varchar,
  boolean,
  text,
  timestamp,
} = require("drizzle-orm/mysql-core");

const users = mysqlTable("users", {
  user_id: varchar("user_id", { length: 225 })
    .primaryKey()
    .$defaultFn(() => createId()),
  user_name: varchar("user_name", { length: 225 }).notNull(),
  user_email: varchar("user_email", { length: 225 }).notNull(),
  user_password: text("user_password").notNull(), // 'text' should work for bcrypt hash
  user_token: varchar("user_token", { length: 250 }),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(null),
  user_profileImage: text("user_profileImage"),
  created_at: timestamp("created_at", {
    mode: "date",
  }).notNull(),
  enrolled_course_id: int("enrolled_course_id"),
  wishlist_id: int("wishlist_id"),
  comment_id: int("comment_id"),
  review_id: int("review_id"),
});

const emailVerification = mysqlTable(
  "emailverification",
  {
    verification_id: varchar("verification_id", { length: 225 }).$defaultFn(
      () => createId()
    ),
    verification_token: varchar("verification_token", {
      length: 500,
    }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
    }).notNull(),
    user_email: varchar("user_email", { length: 225 }).notNull(),
    user_id: varchar("user_id", { length: 225 }).references(
      () => users.user_id,
      {
        onDelete: "cascade",
      }
    ),
  },
  (table) => ({
    compoundKey: primaryKey({
      columns: [table.verification_id, table.verification_token],
    }),
  })
);

const Two_factor = mysqlTable(
  "twofactor",
  {
    Two_factorID: varchar("Two_factorID", { length: 225 }).$defaultFn(() =>
      createId()
    ),
    TwoFactor_code: varchar("TwoFactor_code", {
      length: 500,
    }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
    }).notNull(),
    user_email: varchar("user_email", { length: 225 }).unique().notNull(),
    user_id: varchar("user_id", { length: 225 }).references(
      () => users.user_id,
      {
        onDelete: "cascade",
      }
    ),
  },
  (table) => ({
    compoundKey: primaryKey({
      columns: [table.Two_factorID, table.TwoFactor_code],
    }),
  })
);

module.exports = {
  users,
  emailVerification,
  Two_factor,
};
