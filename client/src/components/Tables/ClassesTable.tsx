import React from 'react';

interface Class {
  id: string;
  tenLop: string;
  khoa: string;
  _count: {
    sinhViens: number;
  };
}

interface ClassesTableProps {
  classes: Class[];
  loading: boolean;
  onDelete: (id: string) => void;
}

const ClassesTable: React.FC<ClassesTableProps> = ({
  classes,
  loading,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 font-medium text-sm uppercase">
          <tr>
            <th className="px-6 py-3">Tên Lớp</th>
            <th className="px-6 py-3">Khoa</th>
            <th className="px-6 py-3">Số Lượng SV</th>
            <th className="px-6 py-3 text-right">Hành Động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={4} className="text-center py-4">Đang tải...</td>
            </tr>
          ) : classes.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">Chưa có lớp nào</td>
            </tr>
          ) : (
            classes.map((cls) => (
              <tr key={cls.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{cls.tenLop}</td>
                <td className="px-6 py-4 text-gray-600">{cls.khoa}</td>
                <td className="px-6 py-4 text-gray-500 font-medium">{cls._count?.sinhViens || 0}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onDelete(cls.id)}
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

export default ClassesTable;
