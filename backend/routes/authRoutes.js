const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/authController");

// مسار تسجيل دخول الأدمن
router.post("/login", loginAdmin);

module.exports = router;
