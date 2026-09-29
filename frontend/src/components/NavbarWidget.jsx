import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { MdLanguage, MdLogout, MdSchool } from "react-icons/md";
function NavbarWidget({ lang, setLang, adminEmail, onLogout }) {
  return (
    <Navbar
      expand="lg"
      className="mb-4 sticky-top bg-white"
      style={{
        borderBottom: "1px solid #e9ecef",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      {" "}
      <Container className="py-2">
        {" "}
        {/* Brand */}{" "}
        <Navbar.Brand className="d-flex align-items-center gap-3">
          {" "}
          <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{
              width: "44px",
              height: "44px",
              backgroundColor: "#eaf2ff",
              color: "#0d6efd",
            }}
          >
            {" "}
            <MdSchool size={27} />{" "}
          </div>{" "}
          <div>
            {" "}
            <div className="fw-bold text-dark" style={{ fontSize: "18px" }}>
              {" "}
              {lang === "ar"
                ? "بوابة إدارة المواد"
                : "Course Management Portal"}{" "}
            </div>{" "}
            <small className="text-muted">
              {" "}
              {lang === "ar"
                ? "لوحة تحكم المسؤول"
                : "Administrator Dashboard"}{" "}
            </small>{" "}
          </div>{" "}
        </Navbar.Brand>{" "}
        <Navbar.Toggle
          aria-controls="admin-navbar"
          className="border-0 shadow-none"
        />{" "}
        <Navbar.Collapse id="admin-navbar" className="justify-content-end">
          {" "}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {" "}
            {/* Admin */}{" "}
            {adminEmail && (
              <div
                className="px-3 py-2 rounded-pill d-flex align-items-center gap-2"
                style={{
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  fontSize: "14px",
                }}
              >
                {" "}
                <span
                  className="rounded-circle"
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#22c55e",
                  }}
                />{" "}
                <span>
                  {" "}
                  {lang === "ar" ? "مدير النظام" : "System Admin"}{" "}
                </span>{" "}
              </div>
            )}{" "}
            {/* Language */}{" "}
            <Button
              variant="light"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="rounded-pill px-3 py-2 border d-flex align-items-center gap-2 fw-semibold"
              style={{ color: "#334155", backgroundColor: "#fff" }}
            >
              {" "}
              <MdLanguage size={19} />{" "}
              {lang === "ar" ? "English" : "العربية"}{" "}
            </Button>{" "}
            {/* Logout */}{" "}
            {adminEmail && (
              <Button
                variant="outline-danger"
                onClick={onLogout}
                className="rounded-pill px-3 py-2 d-flex align-items-center gap-2 fw-semibold"
              >
                {" "}
                <MdLogout size={19} />{" "}
                {lang === "ar" ? "تسجيل الخروج" : "Logout"}{" "}
              </Button>
            )}{" "}
          </div>{" "}
        </Navbar.Collapse>{" "}
      </Container>{" "}
    </Navbar>
  );
}
export default NavbarWidget;
