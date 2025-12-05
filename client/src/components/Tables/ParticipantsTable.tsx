import React from 'react';
import ParticipantTableRow from './ParticipantTableRow';

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

interface ParticipantsTableProps {
  participants: Participant[];
  loading: boolean;
  onUpdateStatus: (participationId: string, status: 'DA_DUYET' | 'TU_CHOI') => void;
}

const ParticipantsTable: React.FC<ParticipantsTableProps> = ({
  participants,
  loading,
  onUpdateStatus,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 font-medium text-sm uppercase">
          <tr>
            <th className="px-6 py-3">Mã SV</th>
            <th className="px-6 py-3">Họ Tên</th>
            <th className="px-6 py-3">Lớp</th>
            <th className="px-6 py-3">Ngày Đăng Ký</th>
            <th className="px-6 py-3">Trạng Thái</th>
            <th className="px-6 py-3 text-right">Hành Động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                Đang tải...
              </td>
            </tr>
          ) : participants.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                Chưa có sinh viên nào đăng ký.
              </td>
            </tr>
          ) : (
            participants.map((p) => (
              <ParticipantTableRow
                key={p.id}
                participant={p}
                onUpdateStatus={onUpdateStatus}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantsTable;
