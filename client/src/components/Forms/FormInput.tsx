import React from 'react';

interface FormField {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'date' | 'datetime-local' | 'number' | 'tel';
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
  colSpan?: 1 | 2;
}

const FormInput: React.FC<FormField> = ({
  name,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder,
  className = 'col-span-1',
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
