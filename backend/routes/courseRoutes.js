const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

// جلب كل المواد وإضافة مادة جديدة
router.get("/", getCourses);
router.post("/", createCourse);

// تعديل وحذف مادة بناءً على الـ ID الخاص بها في MongoDB
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
