import { Mail, Phone } from 'lucide-react';

interface ContactInfoProps {
  formData: any;
  onFieldChange: (field: string, value: string) => void;
}

export function ContactInfo({ formData, onFieldChange }: ContactInfoProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail size={16} className="inline mr-1" />
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onFieldChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="tu@email.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone size={16} className="inline mr-1" />
            Teléfono *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onFieldChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="11 1234-5678"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => onFieldChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="María"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apellido *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => onFieldChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Gonzalez"
          />
        </div>
      </div>
    </div>
  );
}