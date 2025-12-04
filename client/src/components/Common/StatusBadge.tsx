import React from 'react';

interface StatusBadgeProps {
  status: 'DA_DUYET' | 'TU_CHOI' | 'CHO_DUYET';
  variant?: 'small' | 'medium';
}

const getStatusClass = (status: string, variant: 'small' | 'medium' = 'medium') => {
  const baseClass = variant === 'small'
    ? 'px-2 py-0.5 text-xs'
    : 'px-2 py-1 text-xs';

  switch (status) {
    case 'DA_DUYET':
      return `${baseClass} bg-green-100 text-green-700 rounded-full font-medium`;
    case 'TU_CHOI':
      return `${baseClass} bg-red-100 text-red-700 rounded-full font-medium`;
    case 'CHO_DUYET':
      return `${baseClass} bg-yellow-100 text-yellow-700 rounded-full font-medium`;
    default:
      return `${baseClass} bg-gray-100 text-gray-700 rounded-full font-medium`;
  }
};

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'DA_DUYET':
      return 'Đã Duyệt';
    case 'TU_CHOI':
      return 'Từ Chối';
    case 'CHO_DUYET':
      return 'Chờ Duyệt';
    default:
      return status;
  }
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'medium' }) => {
  return (
    <span className={getStatusClass(status, variant)}>
      {getStatusLabel(status)}
    </span>
  );
};

export default StatusBadge;
