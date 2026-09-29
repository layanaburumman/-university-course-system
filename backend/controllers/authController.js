const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// تسجيل دخول الأدمن لوحة التحكم
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. حساب تجريبي خارق وثابت: إذا أدخلت هذه البيانات، سيتم تسجيل دخولك فوراً دون الحاجة للاتصال بـ MongoDB!
    if (email === "admin@university.com" && password === "admin123") {
      const token = jwt.sign(
        { id: "demo_admin_id" },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "1d" },
      );
      return res.status(200).json({
        messageAr: "تم تسجيل الدخول بنجاح! 🎉 (وضع التجربة المحلي)",
        messageEn: "Logged in successfully! 🎉 (Demo Mode)",
        token,
        email: "admin@university.com",
      });
    }

    // 2. الكود الحقيقي في حال قمت بربط MongoDB حقيقية مستقبلاً
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        messageAr: "البريد الإلكتروني أو كلمة المرور غير صحيحة!",
        messageEn: "Invalid email or password!",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        messageAr: "البريد الإلكتروني أو كلمة المرور غير صحيحة!",
        messageEn: "Invalid email or password!",
      });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      messageAr: "تم تسجيل الدخول بنجاح! 🎉",
      messageEn: "Logged in successfully! 🎉",
      token,
      email: admin.email,
    });
  } catch (error) {
    // في حال حدوث خطأ اتصال بـ MongoDB، نبلغ الأدمن بشكل واضح ومريح
    res.status(500).json({
      messageAr:
        "خطأ اتصال بقاعدة البيانات، لكن يمكنك استخدام الحساب التجريبي admin@university.com للدخول!",
      messageEn:
        "DB Connection Error, but you can use the demo account admin@university.com to login!",
    });
  }
};
