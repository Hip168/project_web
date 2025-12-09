import React, { useState, useMemo } from 'react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredStudents = useMemo(() => {
    let result = [...students];

    // Filtering
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(
        (student) =>
          student.maSv.toLowerCase().includes(lowerTerm) ||
          student.hoTen.toLowerCase().includes(lowerTerm) ||
          student.taiKhoan.email.toLowerCase().includes(lowerTerm)
      );
    }

    // Sorting
    if (sortConfig) {
      result.sort((a, b) => {
        let aValue: any = '';
        let bValue: any = '';

        if (sortConfig.key === 'hoTen') {
          // Sort by first name (last word)
          const getFirstName = (fullName: string) => {
            const parts = fullName.trim().split(/\s+/);
            return parts[parts.length - 1].toLowerCase();
          };
          aValue = getFirstName(a.hoTen);
          bValue = getFirstName(b.hoTen);
        } else if (sortConfig.key === 'lop') {
          aValue = (a.lop?.tenLop || '').toLowerCase();
          bValue = (b.lop?.tenLop || '').toLowerCase();
        } else if (sortConfig.key === 'email') {
          aValue = a.taiKhoan.email.toLowerCase();
          bValue = b.taiKhoan.email.toLowerCase();
        } else {
          aValue = (a as any)[sortConfig.key];
          bValue = (b as any)[sortConfig.key];
          if (typeof aValue === 'string') aValue = aValue.toLowerCase();
          if (typeof bValue === 'string') bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [students, searchTerm, sortConfig]);

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <span className="text-gray-300 ml-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">↕</span>;
    }
    return sortConfig.direction === 'asc' ? <span className="ml-1 text-indigo-500">↑</span> : <span className="ml-1 text-indigo-500">↓</span>;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm sinh viên..."
            className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-500">
          Tổng số: <span className="font-semibold text-gray-900">{sortedAndFilteredStudents.length}</span> sinh viên
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th
                className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none group"
                onClick={() => handleSort('maSv')}
              >
                <div className="flex items-center">
                  Mã SV {getSortIcon('maSv')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none group"
                onClick={() => handleSort('hoTen')}
              >
                <div className="flex items-center">
                  Họ Tên {getSortIcon('hoTen')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none group"
                onClick={() => handleSort('lop')}
              >
                <div className="flex items-center">
                  Lớp {getSortIcon('lop')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none group"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center">
                  Email {getSortIcon('email')}
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                Hành Động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <p className="text-sm text-gray-500">Đang tải dữ liệu...</p>
                  </div>
                </td>
              </tr>
            ) : sortedAndFilteredStudents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <svg className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <p className="text-gray-500 font-medium">
                      {searchTerm ? 'Không tìm thấy kết quả phù hợp' : 'Chưa có sinh viên nào'}
                    </p>
                    {searchTerm && (
                      <p className="text-sm text-gray-400">Thử tìm kiếm với từ khóa khác</p>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              sortedAndFilteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/80 transition-colors duration-150 group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 group-hover:bg-white group-hover:shadow-sm transition-all">
                      {student.maSv}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.hoTen}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{student.lop?.tenLop || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 font-mono">{student.taiKhoan.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => onEdit(student)}
                        className="cursor-pointer text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-50 rounded transition-colors"
                        title="Sửa thông tin"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(student.id)}
                        className="cursor-pointer text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                        title="Xóa sinh viên"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
