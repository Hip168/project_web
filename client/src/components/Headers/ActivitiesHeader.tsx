import React from 'react';

interface ActivitiesHeaderProps {
  onAddClick: () => void;
}

const ActivitiesHeader: React.FC<ActivitiesHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
      <h3 className="text-lg font-bold text-gray-800">Quản Lý Hoạt Động</h3>
      <button
        onClick={onAddClick}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        + Thêm Hoạt Động
      </button>
    </div>
  );
};

export default ActivitiesHeader;
