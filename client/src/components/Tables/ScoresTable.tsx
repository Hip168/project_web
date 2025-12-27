import React from 'react';
import StatusBadge from '../Common/StatusBadge';

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

interface ScoresTableProps {
  students: StudentScore[];
  loading: boolean;
}

const ScoresTable: React.FC<ScoresTableProps> = ({
  students,
  loading,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 font-medium text-sm uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4">Mã SV</th>
            <th className="px-6 py-4">Họ Tên</th>
            <th className="px-6 py-4">Lớp</th>
            <th className="px-6 py-4">Tổng Điểm</th>
            <th className="px-6 py-4">Xếp Loại</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                Đang tải báo cáo...
              </td>
            </tr>
          ) : students.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                Không có dữ liệu.
              </td>
            </tr>
          ) : (
            students.map((student) => {
              const latestScore = student.diemRenLuyens?.[0];
              return (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{student.maSv}</td>
                  <td className="px-6 py-4 text-gray-800">{student.hoTen}</td>
                  <td className="px-6 py-4 text-gray-600">{student.lop?.tenLop || 'N/A'}</td>
                  <td className="px-6 py-4 font-bold text-indigo-600">{latestScore?.tongDiem || 0}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={latestScore?.xepLoai as 'DA_DUYET' | 'TU_CHOI' | 'CHO_DUYET'} />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScoresTable;
