import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import api from '../utils/api';
import ActivityCard from '../components/Cards/ActivityCard';
import ReportFormModal from '../components/Modals/ReportFormModal';
import type { RootState } from '../store/store';

interface Activity {
    id: string;
    tenHoatDong: string;
    moTa: string;
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

const StudentActivitiesPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [participations, setParticipations] = useState<Participation[]>([]);
    const [loading, setLoading] = useState(true);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [selectedActivityId, setSelectedActivityId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [activitiesRes, participationsRes] = await Promise.all([
                    api.get('/activities'),
                    api.get(`/participations/student/${user?.profile?.id}`)
                ]);

                setActivities(activitiesRes.data);
                setParticipations(participationsRes.data);
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
        setSelectedActivityId(activityId);
        setIsReportModalOpen(true);
    };

    const handleReportSubmit = async ({ selectedActivityId, proof }: { selectedActivityId: string; proof: string }) => {
        try {
            await api.post('/participations', {
                sinhVienId: user?.profile?.id,
                hoatDongId: selectedActivityId,
                minhChung: proof
            });
            alert('Đăng ký và gửi minh chứng thành công!');
            setIsReportModalOpen(false);
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
                <h2 className="text-2xl font-bold text-gray-800">Tất Cả Hoạt Động</h2>
                <p className="text-gray-600">Danh sách các hoạt động đang và sắp diễn ra</p>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Đang tải dữ liệu...</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {activities.map((activity) => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                            isRegistered={isRegistered(activity.id)}
                            onRegister={handleRegister}
                        />
                    ))}
                    {activities.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            Hiện chưa có hoạt động nào.
                        </div>
                    )}
                </div>
            )}

            <ReportFormModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                onSubmit={handleReportSubmit}
                initialActivityId={selectedActivityId}
            />
        </Layout>
    );
};

export default StudentActivitiesPage;
