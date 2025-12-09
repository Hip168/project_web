import React from 'react';
import ActionButton from '../Buttons/ActionButton';

interface StudentsHeaderProps {
  onAddClick: () => void;
}

const StudentsHeader: React.FC<StudentsHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
      <h3 className="text-lg font-bold text-gray-800">Quản Lý Sinh Viên</h3>
      <ActionButton
        onClick={onAddClick}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg transition-colors"
        colorOnHover="#432dd7"
      >
        + Thêm Sinh Viên
      </ActionButton>
    </div>
  );
};

export default StudentsHeader;
