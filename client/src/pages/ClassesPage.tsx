import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import ClassesTable from '../components/Tables/ClassesTable';
import ClassesModal from '../components/Modals/ClassesModal';
import ActionButton from '../components/Buttons/ActionButton';

interface Class {
  id: string;
  tenLop: string;
  khoa: string;
  _count: {
    sinhViens: number;
  };
}

const ClassesPage: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newClass, setNewClass] = useState({ tenLop: '', khoa: '' });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await api.get('/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/classes', newClass);
      setShowModal(false);
      setNewClass({ tenLop: '', khoa: '' });
      fetchClasses();
    } catch {
      alert('Failed to add class');
    }
  };

  const handleDeleteClass = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lớp này không?')) {
      try {
        await api.delete(`/classes/${id}`);
        fetchClasses();
      } catch {
        alert('Xóa lớp thất bại. Có thể lớp đang có sinh viên.');
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản Lý Lớp Học</h2>
        <ActionButton
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors"
          colorOnHover="#432dd7"
        >
          + Thêm Lớp
        </ActionButton>
      </div>

      <ClassesTable
        classes={classes}
        loading={loading}
        onDelete={handleDeleteClass}
      />

      <ClassesModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddClass}
        newClass={newClass}
        onClassChange={(field, value) =>
          setNewClass({ ...newClass, [field]: value })
        }
      />
    </>
  );
};

export default ClassesPage;
