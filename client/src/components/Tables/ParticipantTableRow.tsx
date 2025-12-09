import React from 'react';
import StatusBadge from '../Common/StatusBadge';
import { motion } from 'motion/react';
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

interface ParticipantTableRowProps {
  index: number;
  participant: Participant;
  onUpdateStatus: (participationId: string, status: 'DA_DUYET' | 'TU_CHOI') => void;
}

const ParticipantTableRow: React.FC<ParticipantTableRowProps> = ({
  participant,
  onUpdateStatus,
  index
}) => {
  const canApprove = participant.trangThai === 'CHO_DUYET';

  return (
    <motion.tr
      key={participant.id}
      className="hover:bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <td className="px-6 py-4 font-medium">{participant.sinhVien.maSv}</td>
      <td className="px-6 py-4">{participant.sinhVien.hoTen}</td>
      <td className="px-6 py-4 text-gray-600">
        {participant.sinhVien.lop?.tenLop}
      </td>
      <td className="px-6 py-4 text-gray-600">
        {new Date(participant.ngayDangKy).toLocaleDateString("vi-VN")}
      </td>
      <td className="px-6 py-4">
        <StatusBadge
          status={participant.trangThai as "DA_DUYET" | "TU_CHOI" | "CHO_DUYET"}
        />
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        {canApprove && (
          <>
            <button
              onClick={() => onUpdateStatus(participant.id, "DA_DUYET")}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              Duyệt
            </button>
            <button
              onClick={() => onUpdateStatus(participant.id, "TU_CHOI")}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Từ Chối
            </button>
          </>
        )}
      </td>
    </motion.tr>
  );
};

export default ParticipantTableRow;
