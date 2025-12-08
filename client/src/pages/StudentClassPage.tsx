import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import ClassmatesTable from '../components/Tables/ClassmatesTable';
import type { RootState } from '../store/store';

interface Student {
  id: string;
  maSv: string;
  hoTen: string;
  ngaySinh: string;
  gioiTinh: string;
  taiKhoan: {
    email: string;
  };
}

const StudentClassPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassmates = async () => {
      try {
        const response = await api.get(`/users/class/${user?.profile?.lopId}`);
        setStudents(response.data);
      } catch (error) {
        console.error('Failed to fetch classmates', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.profile?.lopId) {
      fetchClassmates();
    }
  }, [user?.profile?.lopId]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-800">Lớp Của Tôi: {user?.profile?.lop?.tenLop}</h3>
        <p className="text-sm text-gray-500">Danh sách thành viên trong lớp</p>
      </div>

      <ClassmatesTable
        students={students}
        loading={loading}
        currentUserId={user?.profile?.id}
      />
    </div>
  );
};

export default StudentClassPage;
