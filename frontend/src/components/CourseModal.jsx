import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { MdEdit, MdClose, MdSave } from "react-icons/md";
function CourseModal({ show, handleClose, course, lang, onUpdateCourse }) {
  const [courseNameAr, setCourseNameAr] = useState("");
  const [courseNameEn, setCourseNameEn] = useState("");
  const [credits, setCredits] = useState(3);
  const [professorAr, setProfessorAr] = useState("");
  const [professorEn, setProfessorEn] = useState("");
  const [departmentAr, setDepartmentAr] = useState("");
  const [departmentEn, setDepartmentEn] = useState("");
  useEffect(() => {
    if (course) {
      setCourseNameAr(course.courseNameAr || "");
      setCourseNameEn(course.courseNameEn || "");
      setCredits(course.credits || 3);
      setProfessorAr(course.professorAr || "");
      setProfessorEn(course.professorEn || "");
      setDepartmentAr(course.departmentAr || "");
      setDepartmentEn(course.departmentEn || "");
    }
  }, [course]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      courseNameAr,
      courseNameEn,
      credits: Number(credits),
      professorAr,
      professorEn,
      departmentAr,
      departmentEn,
    };
    onUpdateCourse(course._id, updatedData);
    handleClose();
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      backdrop="static"
      style={{
        textAlign: lang === "ar" ? "right" : "left",
        direction: lang === "ar" ? "rtl" : "ltr",
      }}
    >
      {" "}
      <div className="rounded-4 overflow-hidden border-0 shadow-lg">
        {" "}
        {/* Modal Header */}{" "}
        <Modal.Header
          className="border-0 text-white px-4 py-3"
          style={{
            background: "linear-gradient(135deg, #0d6efd 0%, #084298 100%)",
          }}
        >
          {" "}
          <div className="d-flex align-items-center gap-3">
            {" "}
            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "44px",
                height: "44px",
                background: "rgba(255,255,255,0.15)",
              }}
            >
              {" "}
              <MdEdit size={24} />{" "}
            </div>{" "}
            <div>
              {" "}
              <Modal.Title className="fw-bold mb-1">
                {" "}
                {lang === "ar" ? "تعديل المادة" : "Edit Course"}{" "}
              </Modal.Title>{" "}
              <small className="opacity-75"> {course?.courseCode} </small>{" "}
            </div>{" "}
          </div>{" "}
          <Button
            variant="link"
            onClick={handleClose}
            className="text-white p-1 border-0 shadow-none"
          >
            {" "}
            <MdClose size={25} />{" "}
          </Button>{" "}
        </Modal.Header>{" "}
        <Form onSubmit={handleSubmit}>
          {" "}
          <Modal.Body className="bg-light px-4 py-4">
            {" "}
            {/* Course Names */}{" "}
            <div className="bg-white rounded-4 p-4 mb-3 shadow-sm">
              {" "}
              <h6 className="fw-bold text-primary mb-3">
                {" "}
                {lang === "ar" ? "معلومات المادة" : "Course Information"}{" "}
              </h6>{" "}
              <Row className="g-3">
                {" "}
                <Form.Group as={Col} md={6} controlId="modalNameAr">
                  {" "}
                  <Form.Label className="fw-semibold">
                    {" "}
                    {lang === "ar"
                      ? "اسم المادة (عربي)"
                      : "Course Name (Arabic)"}{" "}
                  </Form.Label>{" "}
                  <Form.Control
                    type="text"
                    value={courseNameAr}
                    onChange={(e) => setCourseNameAr(e.target.value)}
                    className="rounded-3 py-2"
                    required
                  />{" "}
                </Form.Group>{" "}
                <Form.Group as={Col} md={6} controlId="modalNameEn">
                  {" "}
                  <Form.Label className="fw-semibold">
                    {" "}
                    {lang === "ar"
                      ? "اسم المادة (إنجليزي)"
                      : "Course Name (English)"}{" "}
                  </Form.Label>{" "}
                  <Form.Control
                    type="text"
                    value={courseNameEn}
                    onChange={(e) => setCourseNameEn(e.target.value)}
                    className="rounded-3 py-2"
                    required
                  />{" "}
                </Form.Group>{" "}
              </Row>{" "}
            </div>{" "}
            {/* Professor */}{" "}
            <div className="bg-white rounded-4 p-4 mb-3 shadow-sm">
              {" "}
              <h6 className="fw-bold text-primary mb-3">
                {" "}
                {lang === "ar"
                  ? "معلومات المدرس"
                  : "Professor Information"}{" "}
              </h6>{" "}
              <Row className="g-3">
                {" "}
                <Form.Group as={Col} md={4} controlId="modalCredits">
                  {" "}
                  <Form.Label className="fw-semibold">
                    {" "}
                    {lang === "ar" ? "الساعات المعتمدة" : "Credits"}{" "}
                  </Form.Label>{" "}
                  <Form.Control
                    type="number"
                    min="1"
                    max="6"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                    className="rounded-3 py-2"
                    required
                  />{" "}
                </Form.Group>{" "}
                <Form.Group as={Col} md={4} controlId="modalProfAr">
                  {" "}
                  <Form.Label className="fw-semibold">
                    {" "}
                    {lang === "ar"
                      ? "اسم المدرس (عربي)"
                      : "Professor (Arabic)"}{" "}
                  </Form.Label>{" "}
                  <Form.Control
                    type="text"
                    value={professorAr}
                    onChange={(e) => setProfessorAr(e.target.value)}
                    className="rounded-3 py-2"
                    required
                  />{" "}
                </Form.Group>{" "}
                <Form.Group as={Col} md={4} controlId="modalProfEn">
                  {" "}
                  <Form.Label className="fw-semibold">
                    {" "}
                    {lang === "ar"
                      ? "اسم المدرس (إنجليزي)"
                      : "Professor (English)"}{" "}
                  </Form.Label>{" "}
                  <Form.Control
                    type="text"
                    value={professorEn}
                    onChange={(e) => setProfessorEn(e.target.value)}
                    className="rounded-3 py-2"
                    required
                  />{" "}
                </Form.Group>{" "}
              </Row>{" "}
            </div>{" "}
            {/* Department */}{" "}
            <div className="bg-white rounded-4 p-4 shadow-sm">
              {" "}
              <h6 className="fw-bold text-primary mb-3">
                {" "}
                {lang === "ar"
                  ? "معلومات القسم"
                  : "Department Information"}{" "}
              </h6>{" "}
              <Row className="g-3">
                {" "}
                <Form.Group as={Col} md={6} controlId="modalDeptAr">
                  {" "}
                  <Form.Label className="fw-semibold">
                    {" "}
                    {lang === "ar"
                      ? "القسم (عربي)"
                      : "Department (Arabic)"}{" "}
                  </Form.Label>{" "}
                  <Form.Control
                    type="text"
                    value={departmentAr}
                    onChange={(e) => setDepartmentAr(e.target.value)}
                    className="rounded-3 py-2"
                    required
                  />{" "}
                </Form.Group>{" "}
                <Form.Group as={Col} md={6} controlId="modalDeptEn">
                  {" "}
                  <Form.Label className="fw-semibold">
                    {" "}
                    {lang === "ar"
                      ? "القسم (إنجليزي)"
                      : "Department (English)"}{" "}
                  </Form.Label>{" "}
                  <Form.Control
                    type="text"
                    value={departmentEn}
                    onChange={(e) => setDepartmentEn(e.target.value)}
                    className="rounded-3 py-2"
                    required
                  />{" "}
                </Form.Group>{" "}
              </Row>{" "}
            </div>{" "}
          </Modal.Body>{" "}
          {/* Footer */}{" "}
          <Modal.Footer className="bg-white border-0 px-4 py-3">
            {" "}
            <Button
              variant="light"
              onClick={handleClose}
              className="px-4 py-2 rounded-3 fw-semibold border"
            >
              {" "}
              <MdClose className="me-1" size={19} />{" "}
              {lang === "ar" ? "إلغاء" : "Cancel"}{" "}
            </Button>{" "}
            <Button
              variant="primary"
              type="submit"
              className="px-4 py-2 rounded-3 fw-bold shadow-sm"
            >
              {" "}
              <MdSave className="me-1" size={19} />{" "}
              {lang === "ar" ? "حفظ التعديلات" : "Save Changes"}{" "}
            </Button>{" "}
          </Modal.Footer>{" "}
        </Form>{" "}
      </div>{" "}
    </Modal>
  );
}
export default CourseModal;
