import React from 'react';

interface StudentsHeaderProps {
  onAddClick: () => void;
}

const StudentsHeader: React.FC<StudentsHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
      <h3 className="text-lg font-bold text-gray-800">Quản Lý Sinh Viên</h3>
      <button
        onClick={onAddClick}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        + Thêm Sinh Viên
      </button>
    </div>
  );
};

export default StudentsHeader;
