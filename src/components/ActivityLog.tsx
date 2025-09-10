import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Droplets, Scissors, Bug, Wheat, CheckCircle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'irrigation' | 'sowing' | 'fertilizer' | 'pesticide' | 'harvest' | 'other';
  title_ml: string;
  description_ml: string;
  date: Date;
  notes?: string;
}

interface ActivityLogProps {
  farmer: any;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ farmer }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'irrigation' as Activity['type'],
    title_ml: '',
    description_ml: '',
    notes: ''
  });

  useEffect(() => {
    // Load demo activities
    const demoActivities: Activity[] = [
      {
        id: '1',
        type: 'irrigation',
        title_ml: 'ജലസേചനം',
        description_ml: 'പ്രധാന വയലിൽ ജലസേചനം നടത്തി',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: '30 മിനിറ്റ്'
      },
      {
        id: '2',
        type: 'fertilizer',
        title_ml: 'വളപ്രയോഗം',
        description_ml: 'യൂറിയ വള പ്രയോഗിച്ചു',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        notes: '10 കിലോ'
      },
      {
        id: '3',
        type: 'sowing',
        title_ml: 'വിത്ത് വിതയൽ',
        description_ml: 'പുതിയ പാടത്ത് നെൽ വിത്ത് വിതച്ചു',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        notes: 'അരി ഇനം: പൊന്നി'
      }
    ];
    
    const saved = localStorage.getItem('krishiSakhiActivities');
    if (saved) {
      const parsedActivities = JSON.parse(saved).map((a: any) => ({
        ...a,
        date: new Date(a.date)
      }));
      setActivities(parsedActivities);
    } else {
      setActivities(demoActivities);
      localStorage.setItem('krishiSakhiActivities', JSON.stringify(demoActivities));
    }
  }, []);

  const activityTypes = [
    { type: 'irrigation', label: 'ജലസേചനം', icon: Droplets, color: 'text-blue-600' },
    { type: 'sowing', label: 'വിത്ത് വിതയൽ', icon: Wheat, color: 'text-green-600' },
    { type: 'fertilizer', label: 'വളപ്രയോഗം', icon: CheckCircle, color: 'text-purple-600' },
    { type: 'pesticide', label: 'കീടനാശിനി', icon: Bug, color: 'text-red-600' },
    { type: 'harvest', label: 'വിളവെടുപ്പ്', icon: Scissors, color: 'text-yellow-600' },
    { type: 'other', label: 'മറ്റുള്ളവ', icon: Calendar, color: 'text-gray-600' }
  ];

  const getActivityIcon = (type: Activity['type']) => {
    const activityType = activityTypes.find(at => at.type === type);
    return activityType || activityTypes[activityTypes.length - 1];
  };

  const handleAddActivity = () => {
    if (!newActivity.title_ml || !newActivity.description_ml) return;

    const activity: Activity = {
      id: Date.now().toString(),
      type: newActivity.type,
      title_ml: newActivity.title_ml,
      description_ml: newActivity.description_ml,
      date: new Date(),
      notes: newActivity.notes
    };

    const updatedActivities = [activity, ...activities];
    setActivities(updatedActivities);
    localStorage.setItem('krishiSakhiActivities', JSON.stringify(updatedActivities));
    
    setNewActivity({
      type: 'irrigation',
      title_ml: '',
      description_ml: '',
      notes: ''
    });
    setShowAddForm(false);
  };

  return (
    <div className="p-6 pb-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">കൃഷി ആക്റ്റിവിറ്റി</h1>
          <p className="text-gray-600">{farmer.name_ml}യുടെ കൃഷി ലോഗ്</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm text-gray-600 mb-1">ഈ മാസം</h3>
          <p className="text-2xl font-bold text-green-600">{activities.length}</p>
          <p className="text-xs text-gray-500">ആക്റ്റിവിറ്റികൾ</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm text-gray-600 mb-1">അവസാന പ്രവർത്തനം</h3>
          <p className="text-sm font-bold text-gray-800">
            {activities.length > 0 
              ? activities[0].date.toLocaleDateString('ml-IN')
              : 'ഇല്ല'
            }
          </p>
          <p className="text-xs text-gray-500">
            {activities.length > 0 ? activities[0].title_ml : ''}
          </p>
        </div>
      </div>

      {/* Activities Timeline */}
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const activityInfo = getActivityIcon(activity.type);
          const Icon = activityInfo.icon;
          
          return (
            <div key={activity.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg bg-gray-50`}>
                  <Icon className={`w-5 h-5 ${activityInfo.color}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{activity.title_ml}</h3>
                    <span className="text-xs text-gray-500">
                      {activity.date.toLocaleDateString('ml-IN')}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2">{activity.description_ml}</p>
                  
                  {activity.notes && (
                    <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                      കുറിപ്പ്: {activity.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {activities.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">ആക്റ്റിവിറ്റികൾ ഇല്ല</p>
            <p className="text-sm text-gray-400">പുതിയ പ്രവർത്തനം ചേർക്കാൻ + ബട്ടൺ അമർത്തൂ</p>
          </div>
        )}
      </div>

      {/* Add Activity Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">പുതിയ പ്രവർത്തനം</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  പ്രവർത്തനത്തിന്റെ തരം
                </label>
                <select
                  value={newActivity.type}
                  onChange={(e) => setNewActivity({...newActivity, type: e.target.value as Activity['type']})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {activityTypes.map(type => (
                    <option key={type.type} value={type.type}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ശീർഷകം *
                </label>
                <input
                  type="text"
                  value={newActivity.title_ml}
                  onChange={(e) => setNewActivity({...newActivity, title_ml: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="ഉദാ: പ്രധാന വയലിൽ ജലസേചനം"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  വിവരണം *
                </label>
                <textarea
                  value={newActivity.description_ml}
                  onChange={(e) => setNewActivity({...newActivity, description_ml: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                  placeholder="വിശദമായ വിവരണം..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  കുറിപ്പുകൾ
                </label>
                <input
                  type="text"
                  value={newActivity.notes}
                  onChange={(e) => setNewActivity({...newActivity, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="അധിക വിവരങ്ങൾ..."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2 px-4 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                റദ്ദാക്കൂ
              </button>
              <button
                onClick={handleAddActivity}
                disabled={!newActivity.title_ml || !newActivity.description_ml}
                className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                ചേർക്കൂ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;