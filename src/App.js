import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminView from './components/AdminView';
import AvailableTenders from './components/AvailableTenders';
import Notification from './components/Notification';

const App = () => {
  const [tenders, setTenders] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load tenders from localStorage on mount
  useEffect(() => {
    const storedTenders = JSON.parse(localStorage.getItem('tenders')) || [];
    setTenders(storedTenders);

    // Check for recent tenders (created within last 5 minutes)
    const now = new Date();
    const recentTenders = storedTenders.filter(tender => {
      const tenderCreationTime = new Date(tender.createdAt);
      const diffInMinutes = (now - tenderCreationTime) / (1000 * 60);
      return diffInMinutes <= 5;
    });

    if (recentTenders.length > 0) {
      setNotifications(recentTenders.map(tender => tender.name));
    }
  }, []);

  // Save tenders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tenders', JSON.stringify(tenders));
  }, [tenders]);

  const addTender = (newTender) => {
    const tenderWithDetails = {
      ...newTender,
      id: Date.now(),
      quotations: [],
      createdAt: new Date().toISOString(),
    };
    setTenders([...tenders, tenderWithDetails]);

    // Add to notifications if created within 5 minutes
    const now = new Date();
    const tenderCreationTime = new Date(tenderWithDetails.createdAt);
    const diffInMinutes = (now - tenderCreationTime) / (1000 * 60);
    if (diffInMinutes <= 5) {
      setNotifications([...notifications, tenderWithDetails.name]);
    }
  };

  const addQuotation = (tenderId, quotation) => {
    setTenders(prevTenders =>
      prevTenders.map(tender =>
        tender.id === tenderId
          ? { ...tender, quotations: [...tender.quotations, quotation] }
          : tender
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
        <nav className="flex justify-center space-x-4 mb-6">
          <Link to="/" className="text-white font-semibold hover:underline">
            Admin View
          </Link>
          <Link to="/user" className="text-white font-semibold hover:underline">
            User View
          </Link>
        </nav>

        {/* Notification Component */}
        {notifications.length > 0 && (
          <Notification messages={notifications} onClose={clearNotifications} />
        )}

        <Routes>
          <Route
            path="/"
            element={<AdminView tenders={tenders} addTender={addTender} />}
          />
          <Route
            path="/user"
            element={<AvailableTenders tenders={tenders} addQuotation={addQuotation} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
