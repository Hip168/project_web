import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import ParticipationReportTable from '../components/Tables/ParticipationReportTable';
import ReportFormModal from '../components/Modals/ReportFormModal';
import type { RootState } from '../store/store';

interface Participation {
  id: string;
  hoatDong: {
    id: string;
    tenHoatDong: string;
    ngayDienRa: string;
    diemCong: number;
  };
  trangThai: string;
  ngayDangKy: string;
  minhChung: string | null;
}

const StudentReportsPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const response = await api.get(`/participations/student/${user?.profile?.id}`);
        setParticipations(response.data);
      } catch (error) {
        console.error('Failed to fetch participations', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.profile?.id) {
      fetchParticipations();
    }
  }, [user?.profile?.id]);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Báo Cáo Hoạt Động</h2>
          <p className="text-gray-600">Quản lý và theo dõi các hoạt động đã tham gia</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
        >
          <span className="mr-2">+</span> Thêm Báo Cáo
        </button>
      </div>

      <ParticipationReportTable
        participations={participations}
        loading={loading}
      />

      <ReportFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async ({ selectedActivityId, proof }) => {
          try {
            await api.post('/participations', {
              sinhVienId: user?.profile?.id,
              hoatDongId: selectedActivityId,
              minhChung: proof
            });
            alert('Gửi báo cáo thành công!');
            setIsModalOpen(false);
            // Refetch participations
            const response = await api.get(`/participations/student/${user?.profile?.id}`);
            setParticipations(response.data);
          } catch (error) {
            const err = error as { response?: { data?: { message: string } } };
            alert(err.response?.data?.message || 'Gửi báo cáo thất bại');
          }
        }}
      />
    </>
  );
};

export default StudentReportsPage;
