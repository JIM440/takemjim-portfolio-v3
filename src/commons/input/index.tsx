// if label is passed then render the label, but it should take in the label, placeholder, value, onchange
// src/components/commons/Input.tsx

import React from 'react';

interface InputProps {
  label?: string;
  type: 'text' | 'email' | 'textarea';
  placeholder: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-[16px] font-medium text-black"
        >
          {label}:
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className="mt-1 p-2 w-full border border-black placeholder:text-black-700 placeholder:font-normal focus:outline-none"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="mt-1 p-2 w-full border border-black placeholder:text-black-700 placeholder:font-normal focus:outline-none"
        />
      )}
    </div>
  );
};

export default Input;
