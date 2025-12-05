import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import StudentModal from '../components/Modals/StudentModal';
import StudentsHeader from '../components/Headers/StudentsHeader';
import StudentsTable from '../components/Tables/StudentsTable';

interface Student {
  id: string;
  maSv: string;
  hoTen: string;
  lop: { tenLop: string } | null;
  taiKhoan: { email: string };
  // Add other fields needed for edit
  ngaySinh: string;
  gioiTinh: string;
  lopId: string;
  soDienThoai: string;
}

const AdminDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/users');
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to fetch students', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này không?')) {
      try {
        await api.delete(`/users/${id}`);
        setStudents(students.filter(student => student.id !== id));
      } catch (error) {
        console.error('Failed to delete student', error);
        alert('Không thể xóa sinh viên. Vui lòng thử lại.');
      }
    }
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <StudentsHeader onAddClick={() => setIsModalOpen(true)} />
        <StudentsTable
          students={students}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <StudentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={fetchStudents}
        initialData={selectedStudent}
      />
    </Layout>
  );
};

export default AdminDashboard;
