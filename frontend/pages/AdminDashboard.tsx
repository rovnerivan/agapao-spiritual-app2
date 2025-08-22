import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, Heart, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminStats {
  totalConfessions: number;
  pendingConfessions: number;
  completedConfessions: number;
  activeCards: number;
  pendingCards: number;
  totalPrayers: number;
  todayConfessions: number;
  todayPrayers: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats>({
    totalConfessions: 0,
    pendingConfessions: 0,
    completedConfessions: 0,
    activeCards: 0,
    pendingCards: 0,
    totalPrayers: 0,
    todayConfessions: 0,
    todayPrayers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock stats
    const mockStats: AdminStats = {
      totalConfessions: 1247,
      pendingConfessions: 23,
      completedConfessions: 1224,
      activeCards: 156,
      pendingCards: 8,
      totalPrayers: 3891,
      todayConfessions: 47,
      todayPrayers: 128,
    };
    
    setStats(mockStats);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando panel administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-sm border-b border-[#FFD700]/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart3 className="w-6 h-6 text-[#FFD700] mr-3" />
              <h1 className="text-xl font-bold text-white">Panel Administrativo</h1>
            </div>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-400 hover:text-white"
            >
              Volver al inicio
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#212121] rounded-2xl p-6 border border-[#FFD700]/20">
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-8 h-8 text-[#FFD700]" />
              <span className="text-2xl font-bold text-white">{stats.totalConfessions}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Confesiones</p>
            <p className="text-[#FFD700] text-xs mt-1">+{stats.todayConfessions} hoy</p>
          </div>

          <div className="bg-[#212121] rounded-2xl p-6 border border-[#4CAF50]/20">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-[#4CAF50]" />
              <span className="text-2xl font-bold text-white">{stats.totalPrayers}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Oraciones</p>
            <p className="text-[#4CAF50] text-xs mt-1">+{stats.todayPrayers} hoy</p>
          </div>

          <div className="bg-[#212121] rounded-2xl p-6 border border-[#F44336]/20">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-8 h-8 text-[#F44336]" />
              <span className="text-2xl font-bold text-white">{stats.pendingCards}</span>
            </div>
            <p className="text-gray-400 text-sm">Cards Pendientes</p>
            <p className="text-[#F44336] text-xs mt-1">Requieren moderación</p>
          </div>

          <div className="bg-[#212121] rounded-2xl p-6 border border-[#4CAF50]/20">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-[#4CAF50]" />
              <span className="text-2xl font-bold text-white">{stats.activeCards}</span>
            </div>
            <p className="text-gray-400 text-sm">Cards Activas</p>
            <p className="text-[#4CAF50] text-xs mt-1">Disponibles para oración</p>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Confessions Stats */}
          <div className="bg-[#212121] rounded-2xl p-8 border border-[#FFD700]/20">
            <h2 className="text-xl font-bold text-white mb-6">Estado de Confesiones</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Completadas</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-700 rounded-full mr-3">
                    <div 
                      className="h-2 bg-[#4CAF50] rounded-full"
                      style={{ width: `${(stats.completedConfessions / stats.totalConfessions) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium">{stats.completedConfessions}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Pendientes</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-700 rounded-full mr-3">
                    <div 
                      className="h-2 bg-[#FFD700] rounded-full"
                      style={{ width: `${(stats.pendingConfessions / stats.totalConfessions) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium">{stats.pendingConfessions}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Activity */}
          <div className="bg-[#212121] rounded-2xl p-8 border border-[#4CAF50]/20">
            <h2 className="text-xl font-bold text-white mb-6">Actividad de Hoy</h2>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFD700] mb-1">
                  {stats.todayConfessions}
                </div>
                <p className="text-gray-400">Nuevas confesiones</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4CAF50] mb-1">
                  {stats.todayPrayers}
                </div>
                <p className="text-gray-400">Oraciones realizadas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#212121] rounded-2xl p-8 border border-[#FFD700]/20">
          <h2 className="text-xl font-bold text-white mb-6">Acciones Rápidas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              onClick={() => navigate('/admin/moderate')}
              className="bg-[#F44336] hover:bg-[#F44336]/90 text-white font-semibold py-4 rounded-xl"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              Moderar Cards ({stats.pendingCards})
            </Button>
            
            <Button
              variant="outline"
              className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 py-4 rounded-xl"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Ver Reportes
            </Button>
            
            <Button
              variant="outline"
              className="border-gray-600 text-gray-400 hover:text-white py-4 rounded-xl"
            >
              <Users className="w-5 h-5 mr-2" />
              Configuración
            </Button>
          </div>
        </div>

        {/* System Health */}
        <div className="text-center mt-12">
          <div className="bg-[#4CAF50]/10 rounded-2xl p-6 border border-[#4CAF50]/20 max-w-md mx-auto">
            <CheckCircle className="w-8 h-8 text-[#4CAF50] mx-auto mb-3" />
            <p className="text-[#4CAF50] font-medium">Sistema funcionando correctamente</p>
            <p className="text-sm text-gray-400 mt-1">Última actualización: hace 2 minutos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
