import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import ParticipantsTable from '../Tables/ParticipantsTable';
import BaseModal from './BaseModal';

interface Participant {
  id: string;
  sinhVien: {
    maSv: string;
    hoTen: string;
    lop: { tenLop: string };
  };
  trangThai: string;
  ngayDangKy: string;
}

interface ManageParticipantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityId: string;
  activityName: string;
}

const ManageParticipantsModal: React.FC<ManageParticipantsModalProps> = ({ isOpen, onClose, activityId, activityName }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/participations/activity/${activityId}`);
        setParticipants(response.data);
      } catch {
        console.error('Failed to fetch participants');
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && activityId) {
      fetchParticipants();
    }
  }, [isOpen, activityId]);

  const handleUpdateStatus = async (participationId: string, status: 'DA_DUYET' | 'TU_CHOI') => {
    try {
      await api.put(`/participations/${participationId}/status`, { trangThai: status });
      // Refetch participants
      const response = await api.get(`/participations/activity/${activityId}`);
      setParticipants(response.data);
    } catch {
      alert('Cập nhật trạng thái thất bại');
    }
  };

  return (
    <BaseModal
      setOpen={onClose}
      isOpen={isOpen}
      className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          Duyệt tham gia: {activityName}
        </h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <ParticipantsTable
        participants={participants}
        loading={loading}
        onUpdateStatus={handleUpdateStatus}
      />
    </BaseModal>
  );
};

export default ManageParticipantsModal;
