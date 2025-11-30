"use client";

import { FormEvent } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useContactForm } from '../../../hooks/useContactForm';
import { NameField } from './FormFields/NameField';
import { EmailField } from './FormFields/EmailField';
import { PhoneField } from './FormFields/PhoneField';
import { SubjectField } from './FormFields/SubjectField';
import { MessageField } from './FormFields/MessageField';
import { SubmitButton } from './SubmitButton';

export function ContactForm() {
  const {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleSubmit
  } = useContactForm();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit();
  };

  return (
    <div className="bg-gray-50 p-8 md:p-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-light mt-3 mb-2">
          Escribinos
        </h2>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded flex items-start gap-3 animate-fade-in">
          <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-medium text-green-800">
              ¡Listo! Recibimos tu mensaje. Te vamos a escribir a {formData.email} dentro del día hábil.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errors.submit && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded flex items-start gap-3 animate-fade-in">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-red-800">{errors.submit}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <NameField
            value={formData.name}
            error={errors.name}
            onChange={(value) => handleChange('name', value)}
            disabled={isSubmitting}
          />
          
          <EmailField
            value={formData.email}
            error={errors.email}
            onChange={(value) => handleChange('email', value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <PhoneField
            value={formData.phone}
            onChange={(value) => handleChange('phone', value)}
            disabled={isSubmitting}
          />
          
          <SubjectField
            value={formData.subject}
            onChange={(value) => handleChange('subject', value)}
            disabled={isSubmitting}
          />
        </div>

        <MessageField
          value={formData.message}
          error={errors.message}
          onChange={(value) => handleChange('message', value)}
          disabled={isSubmitting}
        />

        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}