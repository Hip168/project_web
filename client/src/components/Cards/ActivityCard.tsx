import React from 'react';

interface Activity {
  id: string;
  tenHoatDong: string;
  moTa?: string;
  tinhChatHoatDong?: string;
  ngayBatDau?: string;
  ngayKetThuc?: string;
  ngayDienRa?: string;
  diaDiem?: string;
}

interface ActivityCardProps {
  activity: Activity;
  variant?: 'view' | 'edit' | 'compact';
  isRegistered?: boolean;
  onRegister?: (activityId: string) => Promise<void>;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, variant = 'view', isRegistered = false, onRegister }) => {
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  if (variant === 'compact') {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <h3 className="font-semibold text-gray-800 truncate">{activity.tenHoatDong}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{activity.moTa}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {activity.tinhChatHoatDong}
          </span>
          <span className="text-xs text-gray-500">{formatDate(activity.ngayBatDau)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{activity.tenHoatDong}</h3>
          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
            {activity.tinhChatHoatDong}
          </span>
        </div>
        <p className="text-sm text-gray-600">{activity.moTa}</p>
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs uppercase font-semibold">Ngày Bắt Đầu</p>
            <p className="text-gray-800 font-medium">{formatDate(activity.ngayBatDau)}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase font-semibold">Ngày Kết Thúc</p>
            <p className="text-gray-800 font-medium">{formatDate(activity.ngayKetThuc)}</p>
          </div>
        </div>
        {onRegister && (
          <div className="mt-4">
            <button
              onClick={() => onRegister(activity.id)}
              disabled={isRegistered}
              className={`w-full py-2 px-3 rounded-lg font-medium transition-colors ${
                isRegistered
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isRegistered ? 'Đã Đăng Ký' : 'Đăng Ký'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
