import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import ScoresTable from '../components/Tables/ScoresTable';

interface StudentScore {
  id: string;
  maSv: string;
  hoTen: string;
  lop: { tenLop: string };
  diemRenLuyens: {
    tongDiem: number;
    xepLoai: string;
    hocKy: { tenHocKy: string; namHoc: string };
  }[];
}

const AdminReports: React.FC = () => {
  const [students, setStudents] = useState<StudentScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      // In a real app, we would have a dedicated endpoint for reports
      // For now, we'll fetch students and include their scores
      const response = await api.get('/users/students');
      // Note: The current getStudents controller might not include diemRenLuyens
      // We might need to update the controller or make separate calls.
      // Assuming we update the controller to include diemRenLuyens
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to fetch scores', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">Báo Cáo Điểm Rèn Luyện</h3>
        </div>

        <ScoresTable
          students={students}
          loading={loading}
        />
      </div>
    </Layout>
  );
};

export default AdminReports;
