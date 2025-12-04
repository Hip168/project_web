import React from 'react';

interface Student {
  id: string;
  maSv: string;
  hoTen: string;
  ngaySinh: string;
  gioiTinh: string;
  taiKhoan: {
    email: string;
  };
}

interface ClassmatesTableProps {
  students: Student[];
  loading: boolean;
  currentUserId?: string;
}

const ClassmatesTable: React.FC<ClassmatesTableProps> = ({
  students,
  loading,
  currentUserId,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 font-medium text-sm uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4">Mã SV</th>
            <th className="px-6 py-4">Họ Tên</th>
            <th className="px-6 py-4">Ngày Sinh</th>
            <th className="px-6 py-4">Giới Tính</th>
            <th className="px-6 py-4">Email</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                Đang tải danh sách lớp...
              </td>
            </tr>
          ) : students.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                Không tìm thấy thành viên nào.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr
                key={student.id}
                className={`hover:bg-gray-50 transition-colors ${student.id === currentUserId ? 'bg-indigo-50' : ''}`}
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {student.maSv}
                  {student.id === currentUserId && (
                    <span className="ml-2 text-xs bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded">
                      Tôi
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-800">{student.hoTen}</td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(student.ngaySinh).toLocaleDateString('vi-VN')}
                </td>
                <td className="px-6 py-4 text-gray-600">{student.gioiTinh}</td>
                <td className="px-6 py-4 text-gray-600">{student.taiKhoan.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClassmatesTable;
