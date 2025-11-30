import { MapPin } from 'lucide-react';
import { argentinianProvinces } from '../../../config/shipping';

interface AddressFormProps {
  formData: any;
  onFieldChange: (field: string, value: string) => void;
}

export function AddressForm({ formData, onFieldChange }: AddressFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin size={16} className="inline mr-1" />
          Dirección *
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => onFieldChange('address', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="Av. Corrientes 1234"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ciudad *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => onFieldChange('city', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Ciudad Autónoma de Buenos Aires"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Provincia *
          </label>
          <select
            value={formData.province}
            onChange={(e) => onFieldChange('province', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="">Seleccionar provincia</option>
            {argentinianProvinces.map((province: string) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Código Postal *
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => onFieldChange('zipCode', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="C1043"
          />
        </div>
      </div>
    </div>
  );
}