// src/components/ContactForm.tsx

import React, { useState } from 'react';
import Button from '../../../../commons/buttons'; // Import the Button component
import Input from '../../../../commons/input';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    request: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('submit');
    // Here you would usually send the form data to a backend or API
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
      <Input
        label="Name"
        type="text"
        placeholder="Enter your name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        label="How can I help you?"
        type="textarea"
        placeholder="Enter your request here"
        name="request"
        value={formData.request}
        onChange={handleChange}
      />
      <Button
        className="w-full"
        title="Submit Request"
        onClick={handleSubmit}
        disabled={!formData.email || !formData.name || !formData.request}
      />
    </form>
  );
};

export default ContactForm;
