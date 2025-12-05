import React from 'react';

interface UserProfile {
  hoTen?: string;
  maSv?: string;
  lop?: { tenLop: string };
}

interface ProfileCardProps {
  user: UserProfile | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
      <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-3xl font-bold text-indigo-600">
        {user?.hoTen?.charAt(0) || 'S'}
      </div>
      <h3 className="text-xl font-bold text-gray-900">{user?.hoTen}</h3>
      <p className="text-gray-500 mb-1">{user?.maSv}</p>
      <p className="text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full text-sm">
        {user?.lop?.tenLop || 'Chưa cập nhật lớp'}
      </p>
    </div>
  );
};

export default ProfileCard;
