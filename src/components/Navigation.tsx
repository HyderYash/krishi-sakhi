import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, User, Activity, TrendingUp, Gift, Clock } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Home, label: 'ഹോം' },
    { path: '/activity', icon: Activity, label: 'ആക്റ്റിവിറ്റി' },
    { path: '/market', icon: TrendingUp, label: 'മാർക്കറ്റ്' },
    { path: '/schemes', icon: Gift, label: 'സ്കീമുകൾ' },
    { path: '/profile', icon: User, label: 'പ്രൊഫൈൽ' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 max-w-md mx-auto">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;