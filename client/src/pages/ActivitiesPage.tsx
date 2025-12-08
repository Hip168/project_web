import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import ActivityModal from '../components/Modals/ActivityModal';
import ManageParticipantsModal from '../components/Modals/ManageParticipantsModal';
import ActivitiesHeader from '../components/Headers/ActivitiesHeader';
import ActivitiesTable from '../components/Tables/ActivitiesTable';

interface Activity {
  id: string;
  tenHoatDong: string;
  moTa: string;
  ngayDienRa: string;
  ngayKetThuc?: string;
  diaDiem: string;
  diemCong: number;
  loaiTieuChi: string;
  hocKy: { tenHocKy: string; namHoc: string };
  hocKyId: string; // Add this for edit
}

const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<{ id: string; name: string } | null>(null);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await api.get('/activities');
      setActivities(response.data);
    } catch (error) {
      console.error('Failed to fetch activities', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hoạt động này không?')) {
      try {
        await api.delete(`/activities/${id}`);
        setActivities(activities.filter(activity => activity.id !== id));
      } catch (error) {
        console.error('Failed to delete activity', error);
        alert('Không thể xóa hoạt động. Vui lòng thử lại.');
      }
    }
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingActivity(null);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <ActivitiesHeader onAddClick={() => setIsModalOpen(true)} />
        <ActivitiesTable
          activities={activities}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onManageParticipants={(id, name) => setSelectedActivity({ id, name })}
        />
      </div>

      <ActivityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={fetchActivities}
        initialData={editingActivity}
      />

      {selectedActivity && (
        <ManageParticipantsModal
          isOpen={!!selectedActivity}
          onClose={() => setSelectedActivity(null)}
          activityId={selectedActivity.id}
          activityName={selectedActivity.name}
        />
      )}
    </>
  );
};

export default ActivitiesPage;
