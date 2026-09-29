const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // الاتصال باستخدام الرابط الموجود في ملف الـ .env
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected RealDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Connection Error to MongoDB: ${error.message}`);
    // لن نقوم بإغلاق السيرفر حتى تتمكن من تشغيله وتجربة الواجهات قبل وضع الرابط الحقيقي الخاص بك
  }
};

module.exports = connectDB;
