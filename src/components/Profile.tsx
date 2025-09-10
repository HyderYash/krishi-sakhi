import React, { useState } from 'react';
import { User, MapPin, Leaf, Phone, Save } from 'lucide-react';

interface ProfileProps {
  farmer?: any;
  onProfileComplete: (profile: any) => void;
}

const Profile: React.FC<ProfileProps> = ({ farmer, onProfileComplete }) => {
  const [formData, setFormData] = useState({
    name_ml: farmer?.name_ml || '',
    name_en: farmer?.name_en || '',
    phone: farmer?.phone || '',
    district: farmer?.district || '',
    farmSizeAcres: farmer?.farmSizeAcres || '',
    soilType: farmer?.soilType || '',
    mainCrops: farmer?.mainCrops || []
  });

  const districts = [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha',
    'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad',
    'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'
  ];

  const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Red soil', 'Black soil', 'Laterite'];
  const cropOptions = ['Rice', 'Coconut', 'Rubber', 'Pepper', 'Cardamom', 'Banana', 'Tapioca', 'Ginger', 'Turmeric'];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCropToggle = (crop: string) => {
    setFormData(prev => ({
      ...prev,
      mainCrops: prev.mainCrops.includes(crop)
        ? prev.mainCrops.filter((c: string) => c !== crop)
        : [...prev.mainCrops, crop]
    }));
  };

  const handleSave = () => {
    const profile = {
      ...formData,
      id: farmer?.id || 'demo-1',
      farmSizeAcres: parseFloat(formData.farmSizeAcres) || 0
    };

    localStorage.setItem('krishiSakhiProfile', JSON.stringify(profile));
    onProfileComplete(profile);
  };

  const isValid = formData.name_ml && formData.district && formData.farmSizeAcres;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {farmer ? 'പ്രൊഫൈൽ എഡിറ്റ് ചെയ്യൂ' : 'കൃഷിക്കാരന്റെ വിവരങ്ങൾ'}
          </h1>
          <p className="text-gray-600">നിങ്ങളുടെ വിവരങ്ങൾ പൂരിപ്പിക്കൂ</p>
        </div>

        <div className="space-y-6">
          {/* Name in Malayalam */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              പേര് (മലയാളം) *
            </label>
            <input
              type="text"
              value={formData.name_ml}
              onChange={(e) => handleInputChange('name_ml', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="ഉദാ: രാജേഷ്"
            />
          </div>

          {/* Name in English */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name (English)
            </label>
            <input
              type="text"
              value={formData.name_en}
              onChange={(e) => handleInputChange('name_en', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="eg: Rajesh"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ഫോൺ നമ്പർ
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="+91-9876543210"
            />
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ജില്ല *
            </label>
            <select
              value={formData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">ജില്ല തിരഞ്ഞെടുക്കൂ</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          {/* Farm Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              കൃഷി ഭൂമിയുടെ വിസ്തീർണ്ണം (ഏക്കർ) *
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.farmSizeAcres}
              onChange={(e) => handleInputChange('farmSizeAcres', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="1.5"
            />
          </div>

          {/* Soil Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              മണ്ണിന്റെ തരം
            </label>
            <select
              value={formData.soilType}
              onChange={(e) => handleInputChange('soilType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">മണ്ണിന്റെ തരം തിരഞ്ഞെടുക്കൂ</option>
              {soilTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Main Crops */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              പ്രധാന വിളകൾ
            </label>
            <div className="grid grid-cols-2 gap-2">
              {cropOptions.map(crop => (
                <button
                  key={crop}
                  type="button"
                  onClick={() => handleCropToggle(crop)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${formData.mainCrops.includes(crop)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>{farmer ? 'അപ്ഡേറ്റ് ചെയ്യൂ' : 'സേവ് ചെയ്യൂ'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;