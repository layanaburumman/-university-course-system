import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Badge, Form, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { MdEdit, MdDelete, MdFileDownload, MdSearch, MdBook, MdQueryBuilder, MdAddCircleOutline, MdCheckCircle } from 'react-icons/md';
import CourseForm from '../components/CourseForm';
import CourseModal from '../components/CourseModal';
import axios from 'axios';

function Dashboard({ lang }) {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // حالات التحكم بالنوافذ المنبثقة للنماذج
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // 🔔 حالات التحكم بنظام التنبيهات المنبثقة الذكي (Toast Alerts)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // دالة ذكية لإظهار التنبيه المنبثق العصري
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  // 1. جلب المواد من الباكيند (GET)
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // 2. إضافة مادة جديدة (POST)
  const handleAddCourse = async (courseData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/courses', courseData);
      // إظهار التنبيه العصري بدلاً من الـ alert التقليدي
      triggerToast(lang === 'ar' ? response.data.messageAr : response.data.messageEn);
      setShowAddModal(false); 
      fetchCourses();
    } catch (error) {
      triggerToast(lang === 'ar' ? error.response?.data?.messageAr : error.response?.data?.messageEn);
    }
  };

  // 3. تعديل مادة (PUT)
  const handleUpdateCourse = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/courses/${id}`, updatedData);
      triggerToast(lang === 'ar' ? response.data.messageAr : response.data.messageEn);
      fetchCourses();
    } catch (error) {
      triggerToast(lang === 'ar' ? 'فشل التعديل' : 'Update failed');
    }
  };

  // 4. حذف مادة (DELETE)
  const handleDeleteCourse = async (id) => {
    const confirmText = lang === 'ar' ? 'هل أنت متأكد من حذف هذه المادة نهائياً؟' : 'Are you sure you want to delete this course permanently?';
    if (!window.confirm(confirmText)) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/courses/${id}`);
      triggerToast(lang === 'ar' ? response.data.messageAr : response.data.messageEn);
      fetchCourses();
    } catch (error) {
      triggerToast(lang === 'ar' ? 'فشل الحذف' : 'Delete failed');
    }
  };

  const totalCredits = courses.reduce((sum, c) => sum + (c.credits || 0), 0);

  const filteredCourses = courses.filter(course => {
    const name = lang === 'ar' ? course.courseNameAr : course.courseNameEn;
    const prof = lang === 'ar' ? course.professorAr : course.professorEn;
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div style={{ direction: lang === 'ar' ? 'rtl' : 'ltr', textAlign: lang === 'ar' ? 'right' : 'left' }}>
      
      {/* 🔮 نظام التنبيهات المنبثقة العصري (Toast Container) يظهر وينهار تلقائياً بجمالية تامة */}
      <ToastContainer position="top-center" className="p-3" style={{ zIndex: 9999 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3500} autohide className="border-0 shadow-lg text-white" style={{ background: '#10b981', borderRadius: '10px' }}>
          <Toast.Body className="d-flex align-items-center gap-2 py-3 px-4 fw-bold">
            <MdCheckCircle size={24} />
            <span>{toastMessage}</span>
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* 📊 بطاقات الإحصاءات العلوية */}
      <Row className="g-3 mb-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm text-white" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', borderRadius: '15px' }}>
            <Card.Body className="d-flex align-items-center justify-content-between p-4">
              <div>
                <h6 className="text-white-50 mb-1">{lang === 'ar' ? 'إجمالي المساقات' : 'Total Courses'}</h6>
                <h2 className="fw-bold m-0 display-6">{courses.length}</h2>
              </div>
              <MdBook size={45} className="opacity-50" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="border-0 shadow-sm text-white" style={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', borderRadius: '15px' }}>
            <Card.Body className="d-flex align-items-center justify-content-between p-4">
              <div>
                <h6 className="text-white-50 mb-1">{lang === 'ar' ? 'مجموع الساعات المعتمدة' : 'Total Hours/Credits'}</h6>
                <h2 className="fw-bold m-0 display-6">{totalCredits}</h2>
              </div>
              <MdQueryBuilder size={45} className="opacity-50" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 🔍 شريط البحث وزر إضافة مادة */}
      <Card className="shadow-sm border-0 mb-4 p-3 bg-white" style={{ borderRadius: '12px' }}>
        <Row className="align-items-center g-3">
          <Col md={8} className="d-flex align-items-center gap-3">
            <div className="bg-light p-2 rounded-circle text-primary">
              <MdSearch size={26} />
            </div>
            <Form.Control
              type="text"
              placeholder={lang === 'ar' ? 'ابحث فورياً برمز المادة، الاسم، أو الدكتور المدرس...' : 'Live search by course code, name, or professor...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 bg-light py-2 px-3 shadow-none"
              style={{ borderRadius: '8px', fontSize: '15px' }}
            />
          </Col>
          <Col md={4} className="text-end">
            <Button 
              variant="success" 
              className="w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm transition-btn"
              onClick={() => setShowAddModal(true)}
              style={{ borderRadius: '8px' }}
            >
              <MdAddCircleOutline size={20} />
              {lang === 'ar' ? 'إضافة مادة جديدة' : 'Add New Course'}
            </Button>
          </Col>
        </Row>
      </Card>

      {/* 🏛️ نافذة منبثقة تفاعلية لإضافة مادة جديدة */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg" centered style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title className="fw-bold">
            {lang === 'ar' ? '🏛️ إضافة مساق جامعي جديد' : '🏛️ Add New Academic Course'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <CourseForm lang={lang} onAddCourse={handleAddCourse} closeModal={() => setShowAddModal(false)} />
        </Modal.Body>
      </Modal>

      {/* 📋 جدول البيانات العصري */}
      <Card className="shadow-sm border-0 overflow-hidden" style={{ borderRadius: '16px' }}>
        <Table responsive hover className="align-middle mb-0">
          <thead className="bg-light text-secondary fw-bold" style={{ borderBottom: '2px solid #f1f5f9' }}>
            <tr className="small tracking-wider text-center" style={{ height: '55px' }}>
              <th>{lang === 'ar' ? 'رمز المادة' : 'Code'}</th>
              <th>{lang === 'ar' ? 'اسم المساق' : 'Course Name'}</th>
              <th>{lang === 'ar' ? 'الساعات' : 'Credits'}</th>
              <th>{lang === 'ar' ? 'المدرس' : 'Professor'}</th>
              <th>{lang === 'ar' ? 'القسم' : 'Department'}</th>
              <th>{lang === 'ar' ? 'الخطة' : 'Syllabus'}</th>
              <th style={{ width: '180px' }}>{lang === 'ar' ? 'الإجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: '#ffffff' }} className="text-center">
            {filteredCourses.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-muted py-5 fs-5 bg-light text-center">
                  ⚠️ {lang === 'ar' ? 'لا توجد أي مواد مطابقة لمدخلات البحث حالياً' : 'No courses match your active search filters'}
                </td>
              </tr>
            ) : (
              filteredCourses.map((course) => (
                <tr key={course._id} className="table-row-hover">
                  <td className="fw-bold text-primary">{course.courseCode}</td>
                  <td className="fw-bold text-dark">{lang === 'ar' ? course.courseNameAr : course.courseNameEn}</td>
                  <td>
                    <Badge bg="primary" className="bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold" style={{ fontSize: '14px' }}>
                      {course.credits} {lang === 'ar' ? 'ساعات' : 'Hrs'}
                    </Badge>
                  </td>
                  <td className="text-secondary fw-semibold">{lang === 'ar' ? course.professorAr : course.professorEn}</td>
                  <td>
                    <span className="badge bg-light text-secondary border px-3 py-2 rounded-pill fw-normal">
                      {lang === 'ar' ? course.departmentAr : course.departmentEn}
                    </span>
                  </td>
                  <td>
                    {course.pdfUrl && (
                      <a
                        href={course.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-link text-danger p-0 fw-bold text-decoration-none d-inline-flex align-items-center gap-1"
                      >
                        <MdFileDownload size={20} /> PDF
                      </a>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => {
                          setSelectedCourse(course);
                          setShowEditModal(true);
                        }}
                        className="btn-action border-1 rounded-3 text-dark fw-bold px-2 py-1"
                      >
                        <MdEdit size={16} />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteCourse(course._id)}
                        className="btn-action border-1 rounded-3 fw-bold px-2 py-1"
                      >
                        <MdDelete size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      <CourseModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        course={selectedCourse}
        lang={lang}
        onUpdateCourse={handleUpdateCourse}
      />

      <style>{`
        .table-row-hover { transition: all 0.2s ease-in-out; }
        .table-row-hover:hover {
          background-color: #f8fafc !important;
          transform: scale(1.001);
          box-shadow: inset 4px 0 0 #3b82f6;
        }
        .btn-action {
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .btn-action:hover { transform: scale(1.1); }
        .transition-btn { transition: all 0.2s ease-in-out; }
        .transition-btn:hover { transform: translateY(-2px); opacity: 0.95; }
        th { font-size: 13px !important; letter-spacing: 0.5px; padding: 15px !important; }
        td { padding: 16px !important; font-size: 14px; }
      `}</style>
    </div>
  );
}

export default Dashboard;
