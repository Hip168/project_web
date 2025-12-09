import React from 'react';
import ActionButton from '../Buttons/ActionButton';

interface ActivitiesHeaderProps {
  onAddClick: () => void;
}

const ActivitiesHeader: React.FC<ActivitiesHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
      <h3 className="text-lg font-bold text-gray-800">Quản Lý Hoạt Động</h3>
      <ActionButton
        onClick={onAddClick}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg transition-colors"
        colorOnHover="#432dd7"
      >
        + Thêm Hoạt Động
      </ActionButton>
    </div>
  );
};

export default ActivitiesHeader;
