require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = async () => {
  // سنقوم باستدعاء دالة الاتصال بـ MongoDB المكتوبة في الـ config
  const db = require("./config/db");
  await db();
};

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

// الـ Middleware الأساسية للـ JSON والـ CORS لتوافق واجهة React
app.use(cors());
app.use(express.json());

// تشغيل دالة الاتصال بقاعدة البيانات الحقيقية
connectDB();

// ربط مسارات الـ API بنظام إدارة الجامعة
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// مسار رئيسي لفحص عمل السيرفر
app.get("/", (req, res) => {
  res.send("سيرفر نظام إدارة المواد الجامعية يعمل بنجاح... 🏛️");
});

// التعامل مع المسارات الخاطئة
app.use((req, res) => {
  res.status(404).json({ messageAr: "المسار غير موجود!", messageEn: "Route not found!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 University Backend running on port ${PORT}`);
});
