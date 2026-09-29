import React, { useState } from "react";
import { Container } from "react-bootstrap";
import NavbarWidget from "./components/NavbarWidget";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  // الحالات الأساسية لإدارة اللغات وجلسة تسجيل دخول الأدمن
  const [lang, setLang] = useState("ar"); // اللغات المدعومة: 'ar' (العربية) أو 'en' (الإنجليزية)
  const [token, setToken] = useState(null); // تخزين رمز الأمان الحقيقي
  const [adminEmail, setAdminEmail] = useState(null); // تخزين بريد الأدمن الحالي

  // دالة التعامل مع نجاح تسجيل دخول الأدمن وتثبيت الجلسة
  const handleLoginSuccess = (userToken, email) => {
    setToken(userToken);
    setAdminEmail(email);
  };

  // دالة تسجيل الخروج وتصفية البيانات الأمنية
  const handleLogout = () => {
    setToken(null);
    setAdminEmail(null);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* شريط التنقل العلوي ثابت ويدعم تغيير اللغات تفاعلياً */}
      <NavbarWidget
        lang={lang}
        setLang={setLang}
        adminEmail={adminEmail}
        onLogout={handleLogout}
      />

      {/* لوحة تحكم تفاعلية: إذا لم يسجل دخول يرى صفحة الـ Login، وإذا نجح يفتح الـ Dashboard الحقيقي */}
      <Container className="pb-5">
        {!token ? (
          <Login lang={lang} onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Dashboard lang={lang} token={token} />
        )}
      </Container>
    </div>
  );
}

export default App;
