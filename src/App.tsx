import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import ActivityLog from './components/ActivityLog';
import LeafScan from './components/LeafScan';
import MarketPrices from './components/MarketPrices';
import Schemes from './components/Schemes';
import Reminders from './components/Reminders';
import ChatPanel from './components/ChatPanel';
import Navigation from './components/Navigation';
import { farmerProfile } from './mocks/demoData';

function App() {
  const [currentFarmer, setCurrentFarmer] = useState(null);
  const [showChat, setShowChat] = useState(false);
  
  useEffect(() => {
    // Mock authentication - check if farmer profile exists
    const savedProfile = localStorage.getItem('krishiSakhiProfile');
    if (savedProfile) {
      setCurrentFarmer(JSON.parse(savedProfile));
    } else {
      // Use demo profile for immediate testing
      setCurrentFarmer(farmerProfile);
      localStorage.setItem('krishiSakhiProfile', JSON.stringify(farmerProfile));
    }
  }, []);

  if (!currentFarmer) {
    return <Profile onProfileComplete={setCurrentFarmer} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
        <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen relative">
          <Routes>
            <Route path="/" element={<Home farmer={currentFarmer} onToggleChat={() => setShowChat(!showChat)} />} />
            <Route path="/profile" element={<Profile farmer={currentFarmer} onProfileComplete={setCurrentFarmer} />} />
            <Route path="/activity" element={<ActivityLog farmer={currentFarmer} />} />
            <Route path="/leaf-scan" element={<LeafScan />} />
            <Route path="/market" element={<MarketPrices />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/reminders" element={<Reminders farmer={currentFarmer} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          <Navigation />
          
          {showChat && (
            <ChatPanel 
              farmer={currentFarmer} 
              onClose={() => setShowChat(false)} 
            />
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;