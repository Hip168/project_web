import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import api from '../utils/api';
import ProfileCard from '../components/Cards/ProfileCard';
import ScoreCard from '../components/Cards/ScoreCard';
import ActivityStats from '../components/Cards/ActivityStats';
import ActivityCard from '../components/Cards/ActivityCard';
import type { RootState } from '../store/store';

interface Activity {
  id: string;
  tenHoatDong: string;
  ngayDienRa: string;
  diaDiem: string;
  diemCong: number;
  loaiTieuChi: string;
}

interface Participation {
  id: string;
  hoatDong: Activity;
  trangThai: string;
  ngayDangKy: string;
}

interface Score {
  tongDiem: number;
  xepLoai: string;
}

const StudentDashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [score, setScore] = useState<Score | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const semestersRes = await api.get('/semesters');
        const currentSemester = semestersRes.data.find((s: { isCurrent: boolean }) => s.isCurrent) || semestersRes.data[0];

        const [activitiesRes, participationsRes, scoreRes] = await Promise.all([
          api.get('/activities'),
          api.get(`/participations/student/${user?.profile?.id}`),
          currentSemester ? api.get(`/scores?sinhVienId=${user?.profile?.id}&hocKyId=${currentSemester.id}`) : Promise.resolve({ data: null })
        ]);

        setActivities(activitiesRes.data);
        setParticipations(participationsRes.data);
        setScore(scoreRes.data);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.profile?.id) {
      fetchData();
    }
  }, [user?.profile?.id]);

  const handleRegister = async (activityId: string) => {
    try {
      await api.post('/participations/register', {
        sinhVienId: user?.profile?.id,
        hoatDongId: activityId
      });
      alert('Đăng ký thành công!');
      // Refetch participations data after registration
      const participationsRes = await api.get(`/participations/student/${user?.profile?.id}`);
      setParticipations(participationsRes.data);
    } catch (error) {
      const err = error as { response?: { data?: { message: string } } };
      alert(err.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  const isRegistered = (activityId: string) => {
    return participations.some(p => p.hoatDong.id === activityId);
  };

  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Tổng Quan</h2>
        <p className="text-gray-600">Chào mừng trở lại, {user?.profile?.hoTen}</p>
      </div>

      {loading ? (
        <div className="text-center py-12">Đang tải dữ liệu...</div>
      ) : (
        <div className="space-y-8">
          {/* Profile & Stats Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ProfileCard user={user?.profile || null} />
            <ScoreCard score={score} />
            <ActivityStats
              approvedCount={participations.filter(p => p.trangThai === 'DA_DUYET').length}
              pendingCount={participations.filter(p => p.trangThai === 'CHO_DUYET').length}
              totalCount={participations.length}
            />
          </div>

          {/* Available Activities Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Hoạt Động Sắp Tới</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activities.slice(0, 3).map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  isRegistered={isRegistered(activity.id)}
                  onRegister={handleRegister}
                />
              ))}
            </div>
            {activities.length > 3 && (
              <div className="mt-4 text-center">
                <button className="text-indigo-600 font-medium hover:text-indigo-800">Xem tất cả hoạt động →</button>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default StudentDashboard;
