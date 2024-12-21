const { eq } = require("drizzle-orm");

const db = require("../db/db");
const { allcourses } = require("../db");

exports.get_PopularCourses = async (req, res) => {
  console.log("HI"); // Checking if the function is being hit
  try {
    //     const Popularcourses = await db;
    //       .select(
    //         allcourses.course_id,
    //         allcourses.course_name,
    //         allcourses.course_image_url,
    //         allcourses.rating,
    //         allcourses.is_popular
    //       )
    //       .from(allcourses)
    //       .where(eq(allcourses.is_popular, true));
    //     const Popularcourses = await db
    //       .select(allcourses.course_id)
    //       .from(allcourses)
    //       .where(eq(allcourses.is_popular, true));
    // Correct way to use "eq"
    const Popularcourses = await db
      .select({
        course_id: allcourses.course_id,
        course_name: allcourses.course_name,
        course_image_url: allcourses.course_image_url,
        instructor_name: allcourses.instructor_name,
        is_popular: allcourses.is_popular,
        rating: allcourses.rating,
      })
      .from(allcourses)
      .where(eq(allcourses.is_popular, true));
    // Fix the condition: use `=== 0` to check for no results
    if (Popularcourses.length === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "Not found!!!",
      });
    }

    return res.status(200).json({
      isSuccess: true,
      Popularcourses,
    });
  } catch (error) {
    console.error(error); // Log any errors to check if something is wrong
    return res.status(500).json({
      isSuccess: false,
      message: "An error occurred.",
    });
  }
};
