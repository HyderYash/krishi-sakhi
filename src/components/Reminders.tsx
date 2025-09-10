import React, { useState, useEffect } from 'react';
import { Bell, Plus, Calendar, Clock, CheckCircle, X, MessageSquare } from 'lucide-react';

interface Reminder {
  id: string;
  title_ml: string;
  description_ml: string;
  dueDate: Date;
  type: 'irrigation' | 'fertilizer' | 'pesticide' | 'harvest' | 'weather' | 'other';
  isCompleted: boolean;
  smsEnabled: boolean;
}

interface RemindersProps {
  farmer: any;
}

const Reminders: React.FC<RemindersProps> = ({ farmer }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title_ml: '',
    description_ml: '',
    dueDate: '',
    type: 'irrigation' as Reminder['type'],
    smsEnabled: true
  });

  useEffect(() => {
    // Load demo reminders
    const demoReminders: Reminder[] = [
      {
        id: '1',
        title_ml: 'ജലസേചനം',
        description_ml: 'പ്രധാന വയലിൽ ജലസേചനം ആവശ്യം',
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        type: 'irrigation',
        isCompleted: false,
        smsEnabled: true
      },
      {
        id: '2',
        title_ml: 'വളപ്രയോഗം',
        description_ml: 'നെൽകൃഷിക്ക് യൂറിയ വള പ്രയോഗിക്കുക',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        type: 'fertilizer',
        isCompleted: false,
        smsEnabled: true
      },
      {
        id: '3',
        title_ml: 'മഴ മുന്നറിയിപ്പ്',
        description_ml: 'നാളെ കനത്ത മഴ - വിളവെടുപ്പ് മാറ്റിവെക്കുക',
        dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
        type: 'weather',
        isCompleted: true,
        smsEnabled: false
      }
    ];

    const saved = localStorage.getItem('krishiSakhiReminders');
    if (saved) {
      const parsedReminders = JSON.parse(saved).map((r: any) => ({
        ...r,
        dueDate: new Date(r.dueDate)
      }));
      setReminders(parsedReminders);
    } else {
      setReminders(demoReminders);
      localStorage.setItem('krishiSakhiReminders', JSON.stringify(demoReminders));
    }
  }, []);

  const reminderTypes = [
    { type: 'irrigation', label: 'ജലസേചനം', color: 'text-blue-600' },
    { type: 'fertilizer', label: 'വളപ്രയോഗം', color: 'text-purple-600' },
    { type: 'pesticide', label: 'കീടനാശിനി', color: 'text-red-600' },
    { type: 'harvest', label: 'വിളവെടുപ്പ്', color: 'text-yellow-600' },
    { type: 'weather', label: 'കാലാവസ്ഥ', color: 'text-green-600' },
    { type: 'other', label: 'മറ്റുള്ളവ', color: 'text-gray-600' }
  ];

  const upcomingReminders = reminders.filter(r => !r.isCompleted && r.dueDate >= new Date());
  const overdueReminders = reminders.filter(r => !r.isCompleted && r.dueDate < new Date());
  const completedReminders = reminders.filter(r => r.isCompleted);

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'ഇന്ന്';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'നാളെ';
    } else {
      return date.toLocaleDateString('ml-IN');
    }
  };

  const getReminderColor = (type: Reminder['type']) => {
    const reminderType = reminderTypes.find(rt => rt.type === type);
    return reminderType?.color || 'text-gray-600';
  };

  const handleAddReminder = () => {
    if (!newReminder.title_ml || !newReminder.dueDate) return;

    const reminder: Reminder = {
      id: Date.now().toString(),
      title_ml: newReminder.title_ml,
      description_ml: newReminder.description_ml,
      dueDate: new Date(newReminder.dueDate),
      type: newReminder.type,
      isCompleted: false,
      smsEnabled: newReminder.smsEnabled
    };

    const updatedReminders = [...reminders, reminder];
    setReminders(updatedReminders);
    localStorage.setItem('krishiSakhiReminders', JSON.stringify(updatedReminders));
    
    setNewReminder({
      title_ml: '',
      description_ml: '',
      dueDate: '',
      type: 'irrigation',
      smsEnabled: true
    });
    setShowAddForm(false);

    if (newReminder.smsEnabled) {
      setTimeout(() => {
        alert('ഡെമോ: റിമൈൻഡർ സെറ്റ് ചെയ്തു! യഥാർത്ഥ ആപ്പിൽ SMS അയക്കും.');
      }, 500);
    }
  };

  const toggleComplete = (id: string) => {
    const updatedReminders = reminders.map(reminder =>
      reminder.id === id ? { ...reminder, isCompleted: !reminder.isCompleted } : reminder
    );
    setReminders(updatedReminders);
    localStorage.setItem('krishiSakhiReminders', JSON.stringify(updatedReminders));
  };

  const sendDemoSMS = (reminder: Reminder) => {
    const message = `കൃഷി സഹായി: ${reminder.title_ml} - ${reminder.description_ml}. തീയതി: ${formatDate(reminder.dueDate)}`;
    
    // Show demo SMS
    alert(`ഡെമോ SMS അയച്ചു:\n\n"${message}"\n\nയഥാർത്ഥ ആപ്പിൽ Twilio/MessageBird വഴി SMS അയക്കും.`);
  };

  const ReminderCard: React.FC<{ reminder: Reminder; section: string }> = ({ reminder, section }) => {
    const isOverdue = !reminder.isCompleted && reminder.dueDate < new Date();
    
    return (
      <div className={`bg-white rounded-xl p-4 shadow-sm border ${
        isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-100'
      }`}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className={`font-semibold ${getReminderColor(reminder.type)} mb-1`}>
              {reminder.title_ml}
            </h3>
            <p className="text-gray-600 text-sm">{reminder.description_ml}</p>
          </div>
          
          <div className="flex space-x-2">
            {reminder.smsEnabled && !reminder.isCompleted && (
              <button
                onClick={() => sendDemoSMS(reminder)}
                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full"
                title="SMS അയക്കൂ"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            )}
            
            <button
              onClick={() => toggleComplete(reminder.id)}
              className={`p-1.5 rounded-full ${
                reminder.isCompleted
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className={`flex items-center ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(reminder.dueDate)}
          </span>
          
          {reminder.smsEnabled && (
            <span className="text-blue-600 text-xs flex items-center">
              <MessageSquare className="w-3 h-3 mr-1" />
              SMS ഓൺ
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 pb-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">റിമൈൻഡറുകൾ</h1>
          <p className="text-gray-600">{farmer.name_ml}യുടെ കൃഷി സൂചനകൾ</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm text-center">
          <p className="text-2xl font-bold text-orange-600">{overdueReminders.length}</p>
          <p className="text-xs text-gray-600">കാലാവധി കഴിഞ്ഞത്</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm text-center">
          <p className="text-2xl font-bold text-blue-600">{upcomingReminders.length}</p>
          <p className="text-xs text-gray-600">വരാൻ ഉള്ളവ</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm text-center">
          <p className="text-2xl font-bold text-green-600">{completedReminders.length}</p>
          <p className="text-xs text-gray-600">പൂർത്തിയായത്</p>
        </div>
      </div>

      {/* Overdue Reminders */}
      {overdueReminders.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-red-600 mb-3 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            കാലാവധി കഴിഞ്ഞവ
          </h2>
          <div className="space-y-3">
            {overdueReminders.map(reminder => (
              <ReminderCard key={reminder.id} reminder={reminder} section="overdue" />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Reminders */}
      {upcomingReminders.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-3 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            വരാൻ ഉള്ള റിമൈൻഡറുകൾ
          </h2>
          <div className="space-y-3">
            {upcomingReminders.map(reminder => (
              <ReminderCard key={reminder.id} reminder={reminder} section="upcoming" />
            ))}
          </div>
        </div>
      )}

      {/* Completed Reminders */}
      {completedReminders.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-green-600 mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            പൂർത്തിയായവ
          </h2>
          <div className="space-y-3 opacity-75">
            {completedReminders.slice(0, 3).map(reminder => (
              <ReminderCard key={reminder.id} reminder={reminder} section="completed" />
            ))}
          </div>
        </div>
      )}

      {reminders.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">റിമൈൻഡറുകൾ ഇല്ല</p>
          <p className="text-sm text-gray-400">പുതിയ റിമൈൻഡർ ചേർക്കാൻ + ബട്ടൺ അമർത്തൂ</p>
        </div>
      )}

      {/* Add Reminder Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm max-h-5/6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">പുതിയ റിമൈൻഡർ</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  തരം
                </label>
                <select
                  value={newReminder.type}
                  onChange={(e) => setNewReminder({...newReminder, type: e.target.value as Reminder['type']})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {reminderTypes.map(type => (
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
                  value={newReminder.title_ml}
                  onChange={(e) => setNewReminder({...newReminder, title_ml: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="ഉദാ: ജലസേചനം"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  വിവരണം
                </label>
                <textarea
                  value={newReminder.description_ml}
                  onChange={(e) => setNewReminder({...newReminder, description_ml: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                  placeholder="വിശദമായ വിവരണം..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  തീയതി ও സമയം *
                </label>
                <input
                  type="datetime-local"
                  value={newReminder.dueDate}
                  onChange={(e) => setNewReminder({...newReminder, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="smsEnabled"
                  checked={newReminder.smsEnabled}
                  onChange={(e) => setNewReminder({...newReminder, smsEnabled: e.target.checked})}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <label htmlFor="smsEnabled" className="text-sm text-gray-700">
                  SMS അലർട്ട് അയക്കൂ
                </label>
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
                onClick={handleAddReminder}
                disabled={!newReminder.title_ml || !newReminder.dueDate}
                className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                ചേർക്കൂ
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              ഡെമോ: യഥാർത്ഥ ആപ്പിൽ SMS/WhatsApp അയക്കും
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reminders;