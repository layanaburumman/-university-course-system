const Course = require("../models/Course");

// 1. إضافة مادة جديدة (Create - POST)
exports.createCourse = async (req, res) => {
  try {
    const {
      courseCode,
      courseNameAr,
      courseNameEn,
      credits,
      professorAr,
      professorEn,
      departmentAr,
      departmentEn,
    } = req.body;

    // التأكد من عدم تكرار رمز المادة
    const courseExists = await Course.findOne({ courseCode });
    if (courseExists) {
      return res.status(400).json({
        messageAr: "رمز المادة مسجل مسبقاً!",
        messageEn: "Course code already exists!",
      });
    }

    // محاكاة رفع ملف الـ PDF لـ Firebase Storage (يعطيك رابطاً افتراضياً لخطة المادة)
    const mockPdfUrl = "https://w3.org";

    const newCourse = new Course({
      courseCode,
      courseNameAr,
      courseNameEn,
      credits,
      professorAr,
      professorEn,
      departmentAr,
      departmentEn,
      pdfUrl: mockPdfUrl,
    });

    await newCourse.save(); // حفظ حقيقي في MongoDB
    res.status(201).json({
      messageAr: "تمت إضافة المادة بنجاح!",
      messageEn: "Course added successfully!",
      data: newCourse,
    });
  } catch (error) {
    res.status(500).json({
      messageAr: "خطأ أثناء إضافة المادة",
      messageEn: "Error adding course",
    });
  }
};

// 2. جلب جميع المواد (Read - GET)
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }); // جلب الأحدث أولاً
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      messageAr: "خطأ في جلب البيانات",
      messageEn: "Error fetching data",
    });
  }
};

// 3. تعديل بيانات المادة (Update - PUT)
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // تحديث البيانات المستلمة في الموديل الحقيقي
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({
        messageAr: "المادة غير موجودة",
        messageEn: "Course not found",
      });
    }

    res.status(200).json({
      messageAr: "تم تحديث المادة بنجاح!",
      messageEn: "Course updated successfully!",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      messageAr: "خطأ أثناء التعديل",
      messageEn: "Error updating course",
    });
  }
};

// 4. حذف مادة نهائياً (Delete - DELETE)
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({
        messageAr: "المادة غير موجودة",
        messageEn: "Course not found",
      });
    }

    res.status(200).json({
      messageAr: "تم حذف المادة بنجاح!",
      messageEn: "Course deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      messageAr: "خطأ أثناء الحذف",
      messageEn: "Error deleting course",
    });
  }
};
