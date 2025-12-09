import React from 'react';
import BaseModal from './BaseModal';
import ActionButton from '../Buttons/ActionButton';

interface ClassesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  newClass: { tenLop: string; khoa: string };
  onClassChange: (field: 'tenLop' | 'khoa', value: string) => void;
}

const ClassesModal: React.FC<ClassesModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  newClass,
  onClassChange,
}) => {

  return (
    <BaseModal
      setOpen={onClose}
      isOpen={isOpen}
      className="bg-white rounded-xl p-6 w-full max-w-md"
    >
      <h3 className="text-xl font-bold mb-4">Thêm Lớp Mới</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên Lớp
          </label>
          <input
            type="text"
            required
            value={newClass.tenLop}
            onChange={(e) => onClassChange("tenLop", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="VD: CNTT-K60"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Khoa
          </label>
          <input
            type="text"
            required
            value={newClass.khoa}
            onChange={(e) => onClassChange("khoa", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="VD: Công nghệ thông tin"
          />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <ActionButton
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-white rounded-lg"
            colorOnHover="#f3f4f6"
          >
            Hủy
          </ActionButton>
          <ActionButton
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
            colorOnHover="#432dd7"
          >
            Thêm Lớp
          </ActionButton>
        </div>
      </form>
    </BaseModal>
  );
};

export default ClassesModal;
