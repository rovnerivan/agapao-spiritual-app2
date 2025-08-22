import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Heart, Clock, CheckCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfessionItem {
  id: string;
  content: string;
  category?: string;
  status: 'submitted' | 'processing' | 'completed';
  createdAt: string;
  hasResponse: boolean;
}

interface PrayerItem {
  id: string;
  cardSummary: string;
  category?: string;
  completedAt: string;
  durationSeconds: number;
}

const categoryLabels: Record<string, string> = {
  anger: 'Ira y Enojo',
  lust: 'Lujuria y Pureza',
  lies: 'Mentira y Engaño',
  pride: 'Orgullo y Soberbia',
  envy: 'Envidia y Celos',
  addictions: 'Adicciones',
  relationships: 'Relaciones',
  other: 'Otros',
};

const categoryEmojis: Record<string, string> = {
  anger: '😤',
  lust: '💔',
  lies: '🤥',
  pride: '👑',
  envy: '😒',
  addictions: '⛓️',
  relationships: '💕',
  other: '🤲',
};

export default function Journey() {
  const navigate = useNavigate();
  const [confessions, setConfessions] = useState<ConfessionItem[]>([]);
  const [prayers, setPrayers] = useState<PrayerItem[]>([]);
  const [activeTab, setActiveTab] = useState<'confessions' | 'prayers'>('confessions');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadJourneyData();
  }, []);

  const loadJourneyData = async () => {
    setIsLoading(true);
    
    // Load confessions from localStorage
    const savedConfessions = localStorage.getItem('agapao_confessions');
    if (savedConfessions) {
      try {
        const confessionData = JSON.parse(savedConfessions);
        setConfessions(confessionData);
      } catch (error) {
        console.error('Error loading confessions:', error);
      }
    }

    // Mock prayer history
    const mockPrayers: PrayerItem[] = [
      {
        id: '1',
        cardSummary: 'Hermano/a luchando con pensamientos de ira hacia un familiar',
        category: 'anger',
        completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        durationSeconds: 300,
      },
      {
        id: '2',
        cardSummary: 'Persona enfrentando tentaciones que la alejan de Dios',
        category: 'lust',
        completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        durationSeconds: 420,
      },
    ];
    
    setPrayers(mockPrayers);
    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-[#4CAF50]';
      case 'processing':
        return 'text-[#FFD700]';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'processing':
        return 'Procesando';
      default:
        return 'Enviada';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando tu journey espiritual...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-sm border-b border-[#FFD700]/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center">
              <BookOpen className="w-6 h-6 text-[#FFD700] mr-3" />
              <h1 className="text-xl font-bold text-white">Mi Journey Espiritual</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Tu camino de restauración
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Aquí puedes revisar tu progreso espiritual, tus confesiones y las oraciones que has hecho por otros.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-[#212121] rounded-xl p-1 mb-8 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('confessions')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'confessions'
                ? 'bg-[#FFD700] text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Mis Confesiones
          </button>
          <button
            onClick={() => setActiveTab('prayers')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'prayers'
                ? 'bg-[#4CAF50] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Mis Oraciones
          </button>
        </div>

        {/* Content */}
        {activeTab === 'confessions' ? (
          <div className="space-y-6">
            {confessions.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Aún no has compartido tu corazón
                </h3>
                <p className="text-gray-400 mb-6">
                  Tu primera confesión te espera. Dios está listo para escucharte.
                </p>
                <Button
                  onClick={() => navigate('/confess')}
                  className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-semibold px-8 py-3 rounded-full"
                >
                  Liberar mi corazón
                </Button>
              </div>
            ) : (
              confessions.map((confession) => (
                <div
                  key={confession.id}
                  className="bg-[#212121] rounded-2xl p-6 border border-[#FFD700]/20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {confession.category && (
                        <span className="text-lg">{categoryEmojis[confession.category]}</span>
                      )}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${getStatusColor(confession.status)}`}>
                            {getStatusText(confession.status)}
                          </span>
                          {confession.status === 'completed' && (
                            <CheckCircle className="w-4 h-4 text-[#4CAF50]" />
                          )}
                        </div>
                        {confession.category && (
                          <span className="text-xs text-gray-400">
                            {categoryLabels[confession.category]}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">
                        {formatDate(confession.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-200 leading-relaxed mb-4 line-clamp-3">
                    {confession.content}
                  </p>
                  
                  {confession.hasResponse && confession.status === 'completed' && (
                    <Button
                      onClick={() => navigate(`/restore/${confession.id}`)}
                      variant="outline"
                      size="sm"
                      className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver respuesta
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {prayers.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Aún no has orado por otros
                </h3>
                <p className="text-gray-400 mb-6">
                  Comienza a llevar las cargas de tus hermanos con amor.
                </p>
                <Button
                  onClick={() => navigate('/intercede')}
                  className="bg-[#4CAF50] hover:bg-[#4CAF50]/90 text-white font-semibold px-8 py-3 rounded-full"
                >
                  Interceder por otros
                </Button>
              </div>
            ) : (
              prayers.map((prayer) => (
                <div
                  key={prayer.id}
                  className="bg-[#212121] rounded-2xl p-6 border border-[#4CAF50]/20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {prayer.category && (
                        <span className="text-lg">{categoryEmojis[prayer.category]}</span>
                      )}
                      <div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-[#4CAF50]" />
                          <span className="text-sm font-medium text-[#4CAF50]">
                            Oración completada
                          </span>
                        </div>
                        {prayer.category && (
                          <span className="text-xs text-gray-400">
                            {categoryLabels[prayer.category]}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">
                        {formatDate(prayer.completedAt)}
                      </p>
                      <div className="flex items-center text-xs text-[#4CAF50] mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDuration(prayer.durationSeconds)}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-200 leading-relaxed">
                    {prayer.cardSummary}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Encouragement */}
        <div className="text-center mt-16">
          <div className="bg-[#FFD700]/10 rounded-2xl p-6 border border-[#FFD700]/20 max-w-2xl mx-auto">
            <p className="text-lg text-[#FFD700] italic leading-relaxed">
              "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis."
            </p>
            <p className="text-sm text-[#FFD700] mt-2">Jeremías 29:11</p>
          </div>
        </div>
      </div>
    </div>
  );
}
