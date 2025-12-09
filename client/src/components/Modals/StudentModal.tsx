import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import BaseModal from './BaseModal';
import ActionButton from '../Buttons/ActionButton';

interface Student {
  id: string;
  maSv: string;
  hoTen: string;
  taiKhoan?: { email: string };
  lopId?: string;
  ngaySinh: string;
  gioiTinh: string;
  soDienThoai?: string;
}

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Student | null;
}

interface ClassItem {
  id: string;
  tenLop: string;
}

const StudentModal: React.FC<StudentModalProps> = ({ isOpen, onClose, onSuccess, initialData }) => {
  const [formData, setFormData] = useState({
    maSv: '',
    hoTen: '',
    email: '',
    password: '',
    lopId: '',
    ngaySinh: '',
    gioitinh: 'Nam',
    soDienThoai: ''
  });
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchClasses();
      if (initialData) {
        setFormData({
          maSv: initialData.maSv,
          hoTen: initialData.hoTen,
          email: initialData.taiKhoan?.email || '',
          password: '', // Don't fill password on edit
          lopId: initialData.lopId || '',
          ngaySinh: initialData.ngaySinh ? new Date(initialData.ngaySinh).toISOString().split('T')[0] : '',
          gioitinh: initialData.gioiTinh || 'Nam',
          soDienThoai: initialData.soDienThoai || ''
        });
      } else {
        // Reset form for add mode
        setFormData({
          maSv: '',
          hoTen: '',
          email: '',
          password: '',
          lopId: '',
          ngaySinh: '',
          gioitinh: 'Nam',
          soDienThoai: ''
        });
      }
    }
  }, [isOpen, initialData]);

  const fetchClasses = async () => {
    try {
      const response = await api.get('/classes');
      setClasses(response.data);
    } catch {
      console.error('Failed to fetch classes');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (initialData) {
        await api.put(`/users/${initialData.id}`, formData);
      } else {
        await api.post('/users/', formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      const error = err as { response?: { data?: { message: string } } };
      setError(error.response?.data?.message || `Failed to ${initialData ? 'update' : 'create'} student`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      setOpen={onClose}
      className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          {initialData ? "Edit Student" : "Add New Student"}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 cursor-pointer text-2xl leading-none"
        >
          ✕
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student ID
          </label>
          <input
            type="text"
            name="maSv"
            value={formData.maSv}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="hoTen"
            value={formData.hoTen}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {!initialData && (
          <>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </>
        )}

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Class
          </label>
          <select
            name="lopId"
            value={formData.lopId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.tenLop}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="ngaySinh"
            value={formData.ngaySinh}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            name="gioitinh"
            value={formData.gioitinh}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="soDienThoai"
            value={formData.soDienThoai}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="col-span-2 flex justify-end space-x-3 mt-4">
          <ActionButton
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
            colorOnHover="#f9fafb"
          >
            Cancel
          </ActionButton>
          <ActionButton
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
            colorOnHover='#432dd7'
          >
            {loading
              ? "Processing..."
              : initialData
              ? "Update Student"
              : "Create Student"}
          </ActionButton>
        </div>
      </form>
    </BaseModal>
  );
};

export default StudentModal;
