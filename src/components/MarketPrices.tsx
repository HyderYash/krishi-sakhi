import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Bell, BellOff, MapPin, Calendar } from 'lucide-react';
import { mandiPrices } from '../mocks/demoData';

interface PriceAlert {
  crop: string;
  enabled: boolean;
  threshold: number;
}

const MarketPrices: React.FC = () => {
  const [selectedMandi, setSelectedMandi] = useState('all');
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('');

  useEffect(() => {
    // Load saved alerts
    const saved = localStorage.getItem('krishiSakhiPriceAlerts');
    if (saved) {
      setPriceAlerts(JSON.parse(saved));
    }
  }, []);

  const mandis = ['all', ...Array.from(new Set(mandiPrices.map(p => p.mandi)))];

  const filteredPrices = selectedMandi === 'all' 
    ? mandiPrices 
    : mandiPrices.filter(p => p.mandi === selectedMandi);

  const calculatePercentChange = (current: number, lastWeek: number) => {
    return ((current - lastWeek) / lastWeek) * 100;
  };

  const isAlertEnabled = (crop: string) => {
    return priceAlerts.find(alert => alert.crop === crop)?.enabled || false;
  };

  const toggleAlert = (crop: string) => {
    const existingAlert = priceAlerts.find(alert => alert.crop === crop);
    
    if (existingAlert) {
      const updatedAlerts = priceAlerts.map(alert =>
        alert.crop === crop ? { ...alert, enabled: !alert.enabled } : alert
      );
      setPriceAlerts(updatedAlerts);
      localStorage.setItem('krishiSakhiPriceAlerts', JSON.stringify(updatedAlerts));
    } else {
      setSelectedCrop(crop);
      setShowAlertModal(true);
    }
  };

  const handleSetAlert = (threshold: number) => {
    const newAlert: PriceAlert = {
      crop: selectedCrop,
      enabled: true,
      threshold
    };

    const updatedAlerts = [...priceAlerts, newAlert];
    setPriceAlerts(updatedAlerts);
    localStorage.setItem('krishiSakhiPriceAlerts', JSON.stringify(updatedAlerts));
    setShowAlertModal(false);
    setSelectedCrop('');

    // Show demo notification
    setTimeout(() => {
      alert(`ഡെമോ: ${selectedCrop} വിലയ്ക്ക് അലർട്ട് സെറ്റ് ചെയ്തു! യഥാർത്ഥ ആപ്പിൽ SMS/WhatsApp നോട്ടിഫിക്കേഷൻ അയക്കും.`);
    }, 500);
  };

  return (
    <div className="p-6 pb-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">മാർക്കറ്റ് വിലകൾ</h1>
        <p className="text-gray-600">തത്സമയ മാർക്കറ്റ് വിലകളും അലർട്ടുകളും</p>
      </div>

      {/* Market Filter */}
      <div className="mb-6 bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-3">മാർക്കറ്റ് തിരഞ്ഞെടുക്കൂ</h2>
        <select
          value={selectedMandi}
          onChange={(e) => setSelectedMandi(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">എല്ലാ മാർക്കറ്റുകളും</option>
          {mandis.slice(1).map(mandi => (
            <option key={mandi} value={mandi}>{mandi}</option>
          ))}
        </select>
      </div>

      {/* Price Cards */}
      <div className="space-y-4 mb-6">
        {filteredPrices.map((price, index) => {
          const percentChange = calculatePercentChange(
            price.pricePerQuintal || price.pricePerDozen || 0,
            price.lastWeek
          );
          const isPositive = percentChange > 0;
          const alertEnabled = isAlertEnabled(price.crop);

          return (
            <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{price.crop}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {price.mandi}
                  </p>
                </div>
                <button
                  onClick={() => toggleAlert(price.crop)}
                  className={`p-2 rounded-full ${
                    alertEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {alertEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">ഇന്നത്തെ വില</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ₹{price.pricePerQuintal || price.pricePerDozen}
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      /{price.pricePerQuintal ? 'ക്വിന്റൽ' : 'ഡസൻ'}
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">കഴിഞ്ഞ ആഴ്ചയിൽ നിന്ന്</p>
                  <div className="flex items-center">
                    {isPositive ? (
                      <TrendingUp className="w-5 h-5 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500 mr-1" />
                    )}
                    <span className={`font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? '+' : ''}{percentChange.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    കഴിഞ്ഞ ആഴ്ച: ₹{price.lastWeek}
                  </p>
                </div>
              </div>

              {alertEnabled && (
                <div className="mt-4 p-3 bg-green-50 rounded-xl border-l-4 border-green-400">
                  <p className="text-sm text-green-700 flex items-center">
                    <Bell className="w-4 h-4 mr-2" />
                    പ്രൈസ് അലർട്ട് ഓൺ
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Market Trends Summary */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
          ഈ ആഴ്ചയിലെ സംഗ്രഹം
        </h2>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">
              {filteredPrices.filter(p => 
                calculatePercentChange(p.pricePerQuintal || p.pricePerDozen || 0, p.lastWeek) > 0
              ).length}
            </p>
            <p className="text-sm text-gray-600">വിലകൾ വർദ്ധിച്ചു</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">
              {filteredPrices.filter(p => 
                calculatePercentChange(p.pricePerQuintal || p.pricePerDozen || 0, p.lastWeek) < 0
              ).length}
            </p>
            <p className="text-sm text-gray-600">വിലകൾ കുറഞ്ഞു</p>
          </div>
        </div>
      </div>

      {/* Alert Setup Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {selectedCrop} പ്രൈസ് അലർട്ട്
            </h2>
            
            <p className="text-gray-600 mb-4">
              വില എത്ര രൂപയിൽ എത്തുമ്പോൾ അലർട്ട് വേണം?
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleSetAlert(2500)}
                className="w-full p-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 font-medium"
              >
                ₹2,500 എത്തുമ്പോൾ
              </button>
              <button
                onClick={() => handleSetAlert(3000)}
                className="w-full p-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 font-medium"
              >
                ₹3,000 എത്തുമ്പോൾ
              </button>
              <button
                onClick={() => handleSetAlert(2000)}
                className="w-full p-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 font-medium"
              >
                ₹2,000 ൽ കുറയുമ്പോൾ
              </button>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAlertModal(false)}
                className="flex-1 py-2 px-4 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                റദ്ദാക്കൂ
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              ഡെമോ: യഥാർത്ഥ ആപ്പിൽ SMS/WhatsApp അലർട്ട് വരും
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPrices;