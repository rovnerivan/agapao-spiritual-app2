import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, BookOpen, Settings, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';

interface UserStats {
  confessions: number;
  prayers: number;
  daysActive: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    confessions: 0,
    prayers: 0,
    daysActive: 1,
  });

  useEffect(() => {
    // Load user stats from localStorage or API
    const savedStats = localStorage.getItem('agapao_user_stats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (error) {
        console.error('Error loading user stats:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-sm border-b border-[#FFD700]/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Flame className="w-8 h-8 text-[#FFD700] mr-3" />
              <div>
                <h1 className="text-xl font-bold text-white">Agapao App</h1>
                <p className="text-sm text-gray-400">Tu refugio espiritual</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bienvenido/a a tu refugio
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Tu corazón es seguro aquí. Encuentra paz, comparte tus cargas y lleva las de otros con amor incondicional.
          </p>
        </div>

        {/* Main Actions */}
        <div className="grid gap-6 mb-12">
          {/* Primary CTA - New Confession */}
          <div 
            onClick={() => navigate('/confess')}
            className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/10 rounded-3xl p-8 border-2 border-[#FFD700]/30 cursor-pointer hover:border-[#FFD700]/50 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-[#FFD700]/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Nueva Confesión</h3>
                <p className="text-gray-300 text-lg">Libera tu corazón con Dios</p>
              </div>
              <Heart className="w-12 h-12 text-[#FFD700]" />
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div 
              onClick={() => navigate('/intercede')}
              className="bg-[#212121] rounded-2xl p-6 border border-[#4CAF50]/20 cursor-pointer hover:border-[#4CAF50]/40 transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-[#4CAF50]" />
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{stats.prayers}</p>
                  <p className="text-sm text-gray-400">oraciones</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Interceder por Otros</h3>
              <p className="text-gray-300">Lleva las cargas de tus hermanos</p>
            </div>

            <div 
              onClick={() => navigate('/journey')}
              className="bg-[#212121] rounded-2xl p-6 border border-[#FFD700]/20 cursor-pointer hover:border-[#FFD700]/40 transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-8 h-8 text-[#FFD700]" />
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{stats.confessions}</p>
                  <p className="text-sm text-gray-400">confesiones</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Mi Journey Espiritual</h3>
              <p className="text-gray-300">Revisa tu camino de restauración</p>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="bg-[#212121]/50 rounded-2xl p-6 border border-[#FFD700]/10">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Tu Progreso Espiritual</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-[#FFD700]">{stats.confessions}</p>
              <p className="text-sm text-gray-400">Confesiones</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#4CAF50]">{stats.prayers}</p>
              <p className="text-sm text-gray-400">Oraciones</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.daysActive}</p>
              <p className="text-sm text-gray-400">Días activo</p>
            </div>
          </div>
        </div>

        {/* Encouragement */}
        <div className="text-center mt-12">
          <div className="bg-[#FFD700]/10 rounded-2xl p-6 border border-[#FFD700]/20">
            <p className="text-lg text-[#FFF8DC] italic leading-relaxed">
              "Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros."
            </p>
            <p className="text-sm text-[#FFD700] mt-2">1 Pedro 5:7</p>
          </div>
        </div>
      </div>
    </div>
  );
}
