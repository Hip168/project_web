import React from 'react';
import ActivityTableRow from './ActivityTableRow';

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

interface ActivitiesTableProps {
  activities: Activity[];
  loading: boolean;
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
  onManageParticipants: (id: string, name: string) => void;
}

const ActivitiesTable: React.FC<ActivitiesTableProps> = ({
  activities,
  loading,
  onEdit,
  onDelete,
  onManageParticipants,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left overflow-hidden">
        <thead className="bg-gray-50 text-gray-600 font-medium text-sm uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4">Tên Hoạt Động</th>
            <th className="px-6 py-4">Ngày Diễn Ra</th>
            <th className="px-6 py-4">Ngày Kết Thúc</th>
            <th className="px-6 py-4">Địa Điểm</th>
            <th className="px-6 py-4">Điểm</th>
            <th className="px-6 py-4">Loại Tiêu Chí</th>
            <th className="px-6 py-4">Học Kỳ</th>
            <th className="px-6 py-4 text-right">Hành Động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : activities.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                Chưa có hoạt động nào.
              </td>
            </tr>
          ) : (
              activities.map((activity, index) => (
                <ActivityTableRow
                  index={index}
                  key={activity.id}
                  activity={activity}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onManageParticipants={onManageParticipants}
                />
              ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActivitiesTable;
