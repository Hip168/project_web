import React from 'react';

interface ActivityStatsProps {
  approvedCount: number;
  pendingCount: number;
  totalCount: number;
}

const ActivityStats: React.FC<ActivityStatsProps> = ({
  approvedCount,
  pendingCount,
  totalCount,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h4 className="font-bold text-gray-800 mb-4">Thống Kê Hoạt Động</h4>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <span className="text-green-700 font-medium">Đã tham gia (Được duyệt)</span>
          <span className="text-2xl font-bold text-green-700">{approvedCount}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
          <span className="text-yellow-700 font-medium">Đang chờ duyệt</span>
          <span className="text-2xl font-bold text-yellow-700">{pendingCount}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600 font-medium">Tổng đăng ký</span>
          <span className="text-2xl font-bold text-gray-800">{totalCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityStats;
