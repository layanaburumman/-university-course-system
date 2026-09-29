import React, { useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { MdLockOutline } from "react-icons/md";

function Login({ lang, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // إرسال طلب تسجيل الدخول الحقيقي للباكيند عبر Axios
      const response = await axios.post(
        "https://university-course-system.onrender.com/api/auth/login",
        { email, password },
      );

      // في حال النجاح، نمرر التوكن والبريد الإلكتروني للـ App الرئيسي
      onLoginSuccess(response.data.token, response.data.email);
    } catch (err) {
      // عرض الخطأ باللغة المختارة بناءً على رد السيرفر
      if (lang === "ar") {
        setError(
          err.response?.data?.messageAr ||
            "تعذر الاتصال بالسيرفر، تأكد من تشغيل الباكيند!",
        );
      } else {
        setError(
          err.response?.data?.messageEn ||
            "Cannot connect to server, make sure backend is running!",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "75vh", direction: lang === "ar" ? "rtl" : "ltr" }}
    >
      <Card
        className="shadow border-0 p-4"
        style={{
          width: "100%",
          maxWidth: "420px",
          textAlign: lang === "ar" ? "right" : "left",
        }}
      >
        <Card.Body>
          <div className="text-center mb-4">
            <div className="bg-primary text-white d-inline-block p-3 rounded-circle mb-2 shadow-sm">
              <MdLockOutline size={35} />
            </div>
            <h3 className="fw-bold text-dark">
              {lang === "ar" ? "لوحة تحكم الأدمن" : "Admin Dashboard"}
            </h3>
            <p className="text-muted small">
              {lang === "ar"
                ? "الرجاء تسجيل الدخول لإدارة المواد"
                : "Please sign in to manage courses"}
            </p>
          </div>

          {error && (
            <Alert variant="danger" className="py-2 text-center small">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* حقل البريد الإلكتروني */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold small">
                {lang === "ar" ? "البريد الإلكتروني" : "Email Address"}
              </Form.Label>
              <Form.Control
                type="email"
                placeholder={
                  lang === "ar" ? "admin@university.com" : "Enter email"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            {/* حقل كلمة المرور */}
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className="fw-bold small">
                {lang === "ar" ? "كلمة المرور" : "Password"}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder={lang === "ar" ? "••••••••" : "Enter password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {/* زر الدخول التفاعلي */}
            <Button
              variant="primary"
              type="submit"
              className="w-100 fw-bold py-2"
              disabled={loading}
            >
              {loading
                ? lang === "ar"
                  ? "جاري التحقق..."
                  : "Verifying..."
                : lang === "ar"
                  ? "تسجيل الدخول 🚀"
                  : "Sign In 🚀"}
            </Button>
          </Form>

          {/* تنبيه لطيف لمساعدتك أثناء التجربة الأولى للمشروع */}
          <div className="mt-4 p-2 bg-light rounded text-center small text-muted">
            💡 {lang === "ar" ? "حساب تجريبي تلقائي:" : "Default Demo Account:"}{" "}
            <br />
            <b>admin@university.com</b> | <b>admin123</b>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
