import React from 'react';
import ActionButton from '../Buttons/ActionButton';
import { motion } from 'motion/react';

interface Activity {
  id: string;
  tenHoatDong: string;
  moTa: string;
  ngayDienRa: string;
  ngayKetThuc?: string;
  diaDiem: string;
  diemCong: number;
  loaiTieuChi: string;
  hocKy: { tenHocKy: string; namHoc: string };
  hocKyId: string;
}

interface ActivityTableRowProps {
  index: number;
  activity: Activity;
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
  onManageParticipants: (id: string, name: string) => void;
}

const ActivityTableRow: React.FC<ActivityTableRowProps> = ({
  activity,
  onEdit,
  onDelete,
  onManageParticipants,
  index,
}) => {
  return (
    <motion.tr
      className="hover:bg-gray-50 transition-colors"
      key={activity.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <td className="px-6 py-4 font-medium text-gray-900">
        {activity.tenHoatDong}
      </td>
      <td className="px-6 py-4 text-gray-600">
        {new Date(activity.ngayDienRa).toLocaleDateString("vi-VN")}
      </td>
      <td className="px-6 py-4 text-gray-600">
        {activity.ngayKetThuc
          ? new Date(activity.ngayKetThuc).toLocaleDateString("vi-VN")
          : "-"}
      </td>
      <td className="px-6 py-4 text-gray-600">{activity.diaDiem || "N/A"}</td>
      <td className="px-6 py-4 font-bold text-indigo-600">
        +{activity.diemCong}
      </td>
      <td className="px-6 py-4">
        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
          {activity.loaiTieuChi}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-600">
        {activity.hocKy.tenHocKy} ({activity.hocKy.namHoc})
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        <ActionButton
          onClick={() =>
            onManageParticipants(activity.id, activity.tenHoatDong)
          }
          className="text-indigo-600 hover:text-indigo-800 font-medium text-sm border border-indigo-600 px-3 py-1 rounded bg-white"
          colorOnHover="#eef2ff"
        >
          Duyệt TG
        </ActionButton>
        <button
          onClick={() => onEdit(activity)}
          className="cursor-pointer text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-50 rounded transition-colors"
          title="Sửa thông tin"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={() => onDelete(activity.id)}
          className="cursor-pointer text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
          title="Xóa hoạt động"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </td>
    </motion.tr>
  );
};

export default ActivityTableRow;
