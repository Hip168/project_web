import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import ScoresTable from '../components/Tables/ScoresTable';

interface StudentScore {
  id: string;
  maSv: string;
  hoTen: string;
  lopId: string;
  lop: { id: string; tenLop: string };
  diemRenLuyens: {
    tongDiem: number;
    xepLoai: string;
    hocKy: { tenHocKy: string; namHoc: string };
  }[];
}

const AdminReports: React.FC = () => {
  const [students, setStudents] = useState<StudentScore[]>([]);
  const [classes, setClasses] = useState<{ id: string; tenLop: string }[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [studentsRes, classesRes] = await Promise.all([
        api.get('/users'),
        api.get('/classes')
      ]);

      setStudents(studentsRes.data);
      setClasses(classesRes.data);

      // Select first class by default if available
      if (classesRes.data.length > 0) {
        setSelectedClass(classesRes.data[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = selectedClass
    ? students.filter(s => s.lopId === selectedClass)
    : students;

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Báo Cáo Điểm Rèn Luyện</h3>

          <div className="flex items-center gap-2">
            <label htmlFor="class-select" className="text-sm font-medium text-gray-700">Lớp:</label>
            <select
              id="class-select"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
            >
              <option value="">Tất cả</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.tenLop}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ScoresTable
          students={filteredStudents}
          loading={loading}
        />
      </div>
    </Layout>
  );
};

export default AdminReports;
