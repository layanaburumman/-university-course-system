import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { MdAddCircleOutline, MdPictureAsPdf } from "react-icons/md";

function CourseForm({ lang, onAddCourse }) {
  const [courseCode, setCourseCode] = useState("");
  const [courseNameAr, setCourseNameAr] = useState("");
  const [courseNameEn, setCourseNameEn] = useState("");
  const [credits, setCredits] = useState(3);
  const [professorAr, setProfessorAr] = useState("");
  const [professorEn, setProfessorEn] = useState("");
  const [departmentAr, setDepartmentAr] = useState("");
  const [departmentEn, setDepartmentEn] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const courseData = {
      courseCode,
      courseNameAr,
      courseNameEn,
      credits: Number(credits),
      professorAr,
      professorEn,
      departmentAr,
      departmentEn,
      pdfFile,
    };

    onAddCourse(courseData);

    setCourseCode("");
    setCourseNameAr("");
    setCourseNameEn("");
    setCredits(3);
    setProfessorAr("");
    setProfessorEn("");
    setDepartmentAr("");
    setDepartmentEn("");
    setPdfFile(null);

    // Reset file input
    e.target.reset();
  };

  return (
    <Card
      className="border-0 shadow-sm rounded-4 overflow-hidden"
      style={{
        textAlign: lang === "ar" ? "right" : "left",
        direction: lang === "ar" ? "rtl" : "ltr",
      }}
    >
      {/* Header */}
      <Card.Header className="bg-white border-0 px-4 pt-4 pb-2">
        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#eaf2ff",
              color: "#0d6efd",
            }}
          >
            <MdAddCircleOutline size={28} />
          </div>

          <div>
            <h4 className="fw-bold mb-1 text-dark">
              {lang === "ar"
                ? "إضافة مادة جامعية جديدة"
                : "Add New University Course"}
            </h4>

            <p className="text-muted mb-0 small">
              {lang === "ar"
                ? "أدخل معلومات المادة لإضافتها إلى النظام"
                : "Enter the course information to add it to the system"}
            </p>
          </div>
        </div>
      </Card.Header>

      <Card.Body className="px-4 pb-4 pt-3">
        <Form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="mb-4">
            <h6 className="fw-bold text-primary mb-3">
              {lang === "ar" ? "المعلومات الأساسية" : "Basic Information"}
            </h6>

            <Row className="g-3">
              <Form.Group as={Col} md={4} controlId="formCourseCode">
                <Form.Label className="fw-semibold">
                  {lang === "ar" ? "رمز المادة" : "Course Code"}
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="CS101"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  className="py-2 rounded-3"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md={4} controlId="formCourseNameAr">
                <Form.Label className="fw-semibold">
                  {lang === "ar" ? "اسم المادة (عربي)" : "Course Name (Arabic)"}
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="مثال: هندسة البرمجيات"
                  value={courseNameAr}
                  onChange={(e) => setCourseNameAr(e.target.value)}
                  className="py-2 rounded-3"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md={4} controlId="formCourseNameEn">
                <Form.Label className="fw-semibold">
                  {lang === "ar"
                    ? "اسم المادة (إنجليزي)"
                    : "Course Name (English)"}
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Software Engineering"
                  value={courseNameEn}
                  onChange={(e) => setCourseNameEn(e.target.value)}
                  className="py-2 rounded-3"
                  required
                />
              </Form.Group>
            </Row>
          </div>

          <hr className="my-4 opacity-10" />

          {/* Professor Information */}
          <div className="mb-4">
            <h6 className="fw-bold text-primary mb-3">
              {lang === "ar" ? "معلومات المدرس" : "Professor Information"}
            </h6>

            <Row className="g-3">
              <Form.Group as={Col} md={4} controlId="formCredits">
                <Form.Label className="fw-semibold">
                  {lang === "ar" ? "الساعات المعتمدة" : "Credits"}
                </Form.Label>

                <Form.Control
                  type="number"
                  min="1"
                  max="6"
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  className="py-2 rounded-3"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md={4} controlId="formProfAr">
                <Form.Label className="fw-semibold">
                  {lang === "ar" ? "اسم المدرس (عربي)" : "Professor (Arabic)"}
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="مثال: د. أحمد"
                  value={professorAr}
                  onChange={(e) => setProfessorAr(e.target.value)}
                  className="py-2 rounded-3"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md={4} controlId="formProfEn">
                <Form.Label className="fw-semibold">
                  {lang === "ar"
                    ? "اسم المدرس (إنجليزي)"
                    : "Professor (English)"}
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Dr. Ahmad"
                  value={professorEn}
                  onChange={(e) => setProfessorEn(e.target.value)}
                  className="py-2 rounded-3"
                  required
                />
              </Form.Group>
            </Row>
          </div>

          <hr className="my-4 opacity-10" />

          {/* Department */}
          <div className="mb-4">
            <h6 className="fw-bold text-primary mb-3">
              {lang === "ar" ? "معلومات القسم" : "Department Information"}
            </h6>

            <Row className="g-3">
              <Form.Group as={Col} md={4} controlId="formDeptAr">
                <Form.Label className="fw-semibold">
                  {lang === "ar" ? "القسم (عربي)" : "Department (Arabic)"}
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="تكنولوجيا المعلومات"
                  value={departmentAr}
                  onChange={(e) => setDepartmentAr(e.target.value)}
                  className="py-2 rounded-3"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md={4} controlId="formDeptEn">
                <Form.Label className="fw-semibold">
                  {lang === "ar" ? "القسم (إنجليزي)" : "Department (English)"}
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Information Technology"
                  value={departmentEn}
                  onChange={(e) => setDepartmentEn(e.target.value)}
                  className="py-2 rounded-3"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md={4} controlId="formFile">
                <Form.Label className="fw-semibold">
                  {lang === "ar" ? "خطة المساق (PDF)" : "Syllabus File (PDF)"}
                </Form.Label>

                <Form.Control
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                  className="py-2 rounded-3"
                />

                {pdfFile && (
                  <small className="text-success d-flex align-items-center gap-1 mt-2">
                    <MdPictureAsPdf size={18} />
                    {pdfFile.name}
                  </small>
                )}
              </Form.Group>
            </Row>
          </div>

          {/* Submit */}
          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="primary"
              type="submit"
              className="px-4 py-2 rounded-3 fw-bold shadow-sm d-flex align-items-center gap-2"
            >
              <MdAddCircleOutline size={21} />

              {lang === "ar" ? "إضافة المادة" : "Add Course"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CourseForm;
