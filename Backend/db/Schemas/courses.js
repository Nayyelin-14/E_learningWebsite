const {
  mysqlTable,
  varchar,
  text,
  timestamp,
  float,
  boolean,
} = require("drizzle-orm/mysql-core");

const allcourses = mysqlTable("courses", {
  course_id: varchar("course_id", { length: 225 }).primaryKey(), // Unique course ID
  course_name: varchar("course_name", { length: 225 }).notNull(), // Course name
  course_description: text("course_description"), // Course description
  course_image_url: varchar("course_image_url", { length: 500 }).notNull(), // Image URL for the course card
  instructor_name: varchar("instructor_name", { length: 225 }).notNull(), // Instructor's name
  rating: float("rating").notNull().default(0), // Course rating (e.g., 4.5)
  is_popular: boolean("is_popular").notNull().default(false), // Indicates if the course is marked as "popular"
  created_at: timestamp("created_at", { mode: "date" }).notNull(), // Timestamp for course creation
  updated_at: timestamp("updated_at", { mode: "date" }).default(null), // Timestamp for last update
});

module.exports = { allcourses };
