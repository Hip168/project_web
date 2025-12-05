import React from 'react';

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
}) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 font-medium text-gray-900">{activity.tenHoatDong}</td>
      <td className="px-6 py-4 text-gray-600">
        {new Date(activity.ngayDienRa).toLocaleDateString('vi-VN')}
      </td>
      <td className="px-6 py-4 text-gray-600">
        {activity.ngayKetThuc ? new Date(activity.ngayKetThuc).toLocaleDateString('vi-VN') : '-'}
      </td>
      <td className="px-6 py-4 text-gray-600">{activity.diaDiem || 'N/A'}</td>
      <td className="px-6 py-4 font-bold text-indigo-600">+{activity.diemCong}</td>
      <td className="px-6 py-4">
        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
          {activity.loaiTieuChi}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-600">
        {activity.hocKy.tenHocKy} ({activity.hocKy.namHoc})
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        <button
          onClick={() => onManageParticipants(activity.id, activity.tenHoatDong)}
          className="text-indigo-600 hover:text-indigo-800 font-medium text-sm border border-indigo-600 px-3 py-1 rounded hover:bg-indigo-50"
        >
          Duyệt TG
        </button>
        <button
          onClick={() => onEdit(activity)}
          className="text-gray-600 hover:text-gray-800 font-medium text-sm"
        >
          Sửa
        </button>
        <button
          onClick={() => onDelete(activity.id)}
          className="text-red-600 hover:text-red-800 font-medium text-sm"
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default ActivityTableRow;
