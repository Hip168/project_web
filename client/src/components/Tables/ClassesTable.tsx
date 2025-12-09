import React from 'react';
import { motion } from 'motion/react';

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
      <table className="w-full text-left overflow-hidden">
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
              <td colSpan={4} className="text-center py-4">
                Đang tải...
              </td>
            </tr>
          ) : classes.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                Chưa có lớp nào
              </td>
            </tr>
          ) : (
            classes.map((cls, index) => (
              <motion.tr
                className="hover:bg-gray-50 group"
                key={cls.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {cls.tenLop}
                </td>
                <td className="px-6 py-4 text-gray-600">{cls.khoa}</td>
                <td className="px-6 py-4 text-gray-500 font-medium">
                  {cls._count?.sinhViens || 0}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => onDelete(cls.id)}
                      className="cursor-pointer text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                      title="Xóa lớp"
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
                  </div>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClassesTable;
