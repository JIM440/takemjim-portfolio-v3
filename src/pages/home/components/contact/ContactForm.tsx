// src/components/ContactForm.tsx

import React, { useState } from 'react';
import Button from '../../../../commons/buttons';
import Input from '../../../../commons/input';
import ScrollReveal from '../../../../commons/scroll-reveal/ScrollReveal';
import { ArrowRight } from 'react-bootstrap-icons';
import { trackFormSubmit } from '../../../../utils/analytics';

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
    // Track form submission
    trackFormSubmit('contact_form');
    // Form will submit naturally via formspree action attribute
  };

  return (
    <ScrollReveal>
      <form
        className="flex flex-col gap-4"
        action="https://formspree.io/f/xyyrdogv"
        method="POST"
        onSubmit={handleSubmit}
      >
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
          icon={
            <ArrowRight size={16} className="ml-2 text-inherit self-baseline" />
          }
        />
      </form>
    </ScrollReveal>
  );
};

export default ContactForm;
