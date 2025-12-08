import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import BaseModal from './BaseModal';

interface ReportFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { selectedActivityId: string; proof: string }) => Promise<void>;
  initialActivityId?: string;
}

interface Activity {
  id: string;
  tenHoatDong: string;
}

const ReportFormModal: React.FC<ReportFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialActivityId
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivityId, setSelectedActivityId] = useState('');
  const [proof, setProof] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchActivities();
      if (initialActivityId) {
        setSelectedActivityId(initialActivityId);
      } else {
        setSelectedActivityId('');
      }
    }
  }, [isOpen, initialActivityId]);

  const fetchActivities = async () => {
    try {
      const response = await api.get('/activities');
      setActivities(response.data);
    } catch (error) {
      console.error('Failed to fetch activities', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActivityId) {
      alert('Vui lòng chọn hoạt động');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ selectedActivityId, proof });
      setSelectedActivityId('');
      setProof('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal
      setOpen={onClose}
      className="bg-white rounded-xl p-6 w-full max-w-md"
      isOpen={isOpen}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4">Thêm Báo Cáo Mới</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hoạt Động
          </label>
          <select
            value={selectedActivityId}
            onChange={(e) => setSelectedActivityId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">-- Chọn hoạt động --</option>
            {activities.map((act) => (
              <option key={act.id} value={act.id}>
                {act.tenHoatDong}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link Minh Chứng
          </label>
          <input
            type="text"
            value={proof}
            onChange={(e) => setProof(e.target.value)}
            placeholder="Nhập link ảnh/tài liệu minh chứng..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Ví dụ: Link Google Drive, Imgur...
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Gửi..." : "Gửi Báo Cáo"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default ReportFormModal;
