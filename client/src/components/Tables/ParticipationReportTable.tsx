import React from 'react';
import StatusBadge from '../Common/StatusBadge';
import { motion } from 'motion/react';
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

interface ParticipationReportTableProps {
  participations: Participation[];
  loading: boolean;
}

const ParticipationReportTable: React.FC<ParticipationReportTableProps> = ({
  participations,
  loading,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Hoạt Động</th>
              <th className="px-6 py-4">Ngày Diễn Ra</th>
              <th className="px-6 py-4">Ngày Đăng Ký</th>
              <th className="px-6 py-4">Minh Chứng</th>
              <th className="px-6 py-4">Trạng Thái</th>
              <th className="px-6 py-4">Điểm</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : participations.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Bạn chưa có báo cáo hoạt động nào.
                </td>
              </tr>
            ) : (
              participations.map((p, index) => (
                <motion.tr
                  key={p.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {p.hoatDong.tenHoatDong}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(p.hoatDong.ngayDienRa).toLocaleDateString(
                      "vi-VN"
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(p.ngayDangKy).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4">
                    {p.minhChung ? (
                      <a
                        href={p.minhChung}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline text-sm"
                      >
                        Xem Minh Chứng
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm italic">
                        Chưa có
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge
                      status={
                        p.trangThai as "DA_DUYET" | "TU_CHOI" | "CHO_DUYET"
                      }
                    />
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700">
                    {p.trangThai === "DA_DUYET"
                      ? `+${p.hoatDong.diemCong}`
                      : "0"}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipationReportTable;
