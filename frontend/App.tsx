import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Confess from './pages/Confess';
import Restore from './pages/Restore';
import Intercede from './pages/Intercede';
import PrayerTimer from './pages/PrayerTimer';
import Journey from './pages/Journey';
import AdminDashboard from './pages/AdminDashboard';
import Moderation from './pages/Moderation';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Preparando tu refugio espiritual...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
      <Route path="/onboarding" element={user && !user.countryCode ? <Onboarding /> : <Navigate to={user ? "/dashboard" : "/"} />} />
      <Route path="/dashboard" element={user && user.countryCode ? <Dashboard /> : <Navigate to={user ? "/onboarding" : "/"} />} />
      <Route path="/confess" element={user && user.countryCode ? <Confess /> : <Navigate to="/" />} />
      <Route path="/restore/:id" element={user && user.countryCode ? <Restore /> : <Navigate to="/" />} />
      <Route path="/intercede" element={user && user.countryCode ? <Intercede /> : <Navigate to="/" />} />
      <Route path="/pray/:cardId" element={user && user.countryCode ? <PrayerTimer /> : <Navigate to="/" />} />
      <Route path="/journey" element={user && user.countryCode ? <Journey /> : <Navigate to="/" />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/moderate" element={<Moderation />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <AppRoutes />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}
