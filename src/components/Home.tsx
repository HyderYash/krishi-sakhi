import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Cloud, TrendingUp, Leaf, Gift, Bell } from 'lucide-react';
import VoiceButton from './VoiceButton';
import { weatherMock, getWeatherRecommendation } from '../mocks/demoData';

interface HomeProps {
  farmer: any;
  onToggleChat: () => void;
}

const Home: React.FC<HomeProps> = ({ farmer, onToggleChat }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Get personalized recommendation based on weather and farmer data
    const rec = getWeatherRecommendation(weatherMock, farmer);
    setRecommendation(rec);
  }, [farmer]);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'സുപ്രഭാതം';
    if (hour < 17) return 'നമസ്കാരം';
    return 'സുസന്ധ്യ';
  };

  const quickActions = [
    {
      title: 'ഇറിഗേഷൻ ചെക്ക്',
      subtitle: 'Water check',
      icon: Cloud,
      color: 'bg-blue-100 text-blue-600',
      action: onToggleChat
    },
    {
      title: 'ലീഫ് സ്കാൻ',
      subtitle: 'Leaf scan',
      icon: Leaf,
      color: 'bg-green-100 text-green-600',
      link: '/leaf-scan'
    },
    {
      title: 'മാർക്കറ്റ് വില',
      subtitle: 'Market prices',
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600',
      link: '/market'
    },
    {
      title: 'സ്കീമുകൾ',
      subtitle: 'Gov schemes',
      icon: Gift,
      color: 'bg-purple-100 text-purple-600',
      link: '/schemes'
    }
  ];

  return (
    <div className="p-6 pb-24 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {getGreeting()}, {farmer.name_ml}!
            </h1>
            <p className="text-gray-600">
              {farmer.district} • {farmer.farmSizeAcres} ഏക്കർ
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              {currentTime.toLocaleDateString('ml-IN')}
            </p>
            <p className="text-lg font-semibold text-green-600">
              {weatherMock.today.tempC}°C
            </p>
          </div>
        </div>
      </div>

      {/* Voice Button */}
      <div className="mb-8 text-center">
        <h2 className="text-lg font-medium text-gray-700 mb-4">
          ഞാൻ നിങ്ങളുടെ കൃഷി സഹായി — എന്ത് സഹായം വേണം?
        </h2>
        <VoiceButton onVoiceInput={onToggleChat} />
        <p className="text-sm text-gray-500 mt-2">
          വോയ്സ് ബട്ടൺ അമർത്തി സംസാരിക്കൂ
        </p>
      </div>

      {/* Today's Recommendation */}
      {recommendation && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl border-l-4 border-green-500">
          <div className="flex items-start">
            <Bell className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-800 mb-1">ഇന്നത്തെ ശിപാർശ</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{recommendation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {quickActions.map((action, index) => {
          const ActionIcon = action.icon;
          
          if (action.link) {
            return (
              <a
                key={index}
                href={action.link}
                className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 active:scale-95"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-3`}>
                  <ActionIcon className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">{action.title}</h3>
                <p className="text-xs text-gray-500">{action.subtitle}</p>
              </a>
            );
          }

          return (
            <button
              key={index}
              onClick={action.action}
              className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 active:scale-95"
            >
              <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-3`}>
                <ActionIcon className="w-6 h-6" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1">{action.title}</h3>
              <p className="text-xs text-gray-500">{action.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Weather Summary */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-medium text-gray-800 mb-3 flex items-center">
          <Cloud className="w-5 h-5 mr-2 text-blue-600" />
          കാലാവസ്ഥ വിവരം
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">ഇന്ന്:</span>
            <span className="font-medium">{weatherMock.today.condition} • {weatherMock.today.tempC}°C</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">നാളെ:</span>
            <span className="font-medium text-blue-600">
              {weatherMock.tomorrow.condition} • {weatherMock.tomorrow.tempC}°C
            </span>
          </div>
          {weatherMock.tomorrow.rainTomorrow && (
            <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded mt-2">
              നാളെ മഴ സാധ്യത: {Math.round(weatherMock.tomorrow.rainProbability * 100)}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;