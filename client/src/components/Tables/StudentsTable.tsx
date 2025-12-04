import React from 'react';

interface Student {
  id: string;
  maSv: string;
  hoTen: string;
  lop: { tenLop: string } | null;
  taiKhoan: { email: string };
  ngaySinh: string;
  gioiTinh: string;
  lopId: string;
  soDienThoai: string;
}

interface StudentsTableProps {
  students: Student[];
  loading: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 font-medium text-sm uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4">Mã SV</th>
            <th className="px-6 py-4">Họ Tên</th>
            <th className="px-6 py-4">Lớp</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4 text-right">Hành Động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : students.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                Không tìm thấy sinh viên nào.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{student.maSv}</td>
                <td className="px-6 py-4 text-gray-800">{student.hoTen}</td>
                <td className="px-6 py-4 text-gray-600">{student.lop?.tenLop || 'N/A'}</td>
                <td className="px-6 py-4 text-gray-600">{student.taiKhoan.email}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => onEdit(student)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => onDelete(student.id)}
                    className="text-red-600 hover:text-red-800 font-medium text-sm"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
