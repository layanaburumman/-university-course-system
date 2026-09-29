const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // دعم اللغتين في اسم المادة
    courseNameAr: { type: String, required: true },
    courseNameEn: { type: String, required: true },

    credits: { type: Number, required: true },

    // دعم اللغتين في اسم الدكتور
    professorAr: { type: String, required: true },
    professorEn: { type: String, required: true },

    // دعم اللغتين في القسم (مثال: IT / تكنولوجيا المعلومات)
    departmentAr: { type: String, required: true },
    departmentEn: { type: String, required: true },

    // رابط ملف خطة المساق PDF المخزن (سواء Firebase أو المحاكاة الافتراضية)
    pdfUrl: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", CourseSchema);
