const express = require("express");
const router = express.Router();
const courseController = require("../Controllers/courses");
router.get("/get_PopularCourses", courseController.get_PopularCourses);
module.exports = router;
