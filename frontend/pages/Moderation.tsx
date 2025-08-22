import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface PendingCard {
  id: string;
  confessionId: string;
  summary: string;
  category?: string;
  createdAt: string;
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

export default function Moderation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pendingCards, setPendingCards] = useState<PendingCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [moderatingId, setModeratingId] = useState<string | null>(null);

  useEffect(() => {
    loadPendingCards();
  }, []);

  const loadPendingCards = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock pending cards
    const mockCards: PendingCard[] = [
      {
        id: '1',
        confessionId: 'conf_1',
        summary: 'Hermano/a luchando con pensamientos de ira hacia un familiar. Busca paz y perdón en su corazón.',
        category: 'anger',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        confessionId: 'conf_2',
        summary: 'Persona enfrentando tentaciones que la alejan de Dios. Necesita fortaleza espiritual y guía divina.',
        category: 'lust',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        confessionId: 'conf_3',
        summary: 'Alguien que ha mentido a sus seres queridos y busca valor para decir la verdad y restaurar la confianza.',
        category: 'lies',
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '4',
        confessionId: 'conf_4',
        summary: 'Hermano/a luchando con orgullo en su trabajo. Quiere ser más humilde y servicial con sus compañeros.',
        category: 'pride',
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '5',
        confessionId: 'conf_5',
        summary: 'Persona enfrentando problemas serios en su matrimonio. Busca sabiduría divina y restauración en la relación.',
        category: 'relationships',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      },
    ];
    
    setPendingCards(mockCards);
    setIsLoading(false);
  };

  const handleModerate = async (cardId: string, action: 'approve' | 'reject') => {
    setModeratingId(cardId);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove card from pending list
      setPendingCards(prev => prev.filter(card => card.id !== cardId));
      
      toast({
        title: action === 'approve' ? 'Card aprobada' : 'Card rechazada',
        description: action === 'approve' 
          ? 'La card está ahora disponible para intercesión'
          : 'La card ha sido rechazada y no será visible',
      });
    } catch (error) {
      console.error('Error moderating card:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al moderar la card. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setModeratingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''} atrás`;
    } else if (diffHours < 24) {
      return `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} día${diffDays > 1 ? 's' : ''} atrás`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#F44336] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando cards pendientes...</p>
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
              onClick={() => navigate('/admin')}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-[#F44336] mr-3" />
              <h1 className="text-xl font-bold text-white">Cola de Moderación</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="bg-[#212121] rounded-2xl p-6 border border-[#F44336]/20 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Cards Pendientes de Moderación</h2>
              <p className="text-gray-300">
                Revisa y modera las cards de intercesión antes de que sean visibles para la comunidad
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#F44336] mb-1">
                {pendingCards.length}
              </div>
              <p className="text-gray-400 text-sm">pendientes</p>
            </div>
          </div>
        </div>

        {/* Pending Cards */}
        {pendingCards.length === 0 ? (
          <div className="text-center py-16">
            <CheckCircle className="w-16 h-16 text-[#4CAF50] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              ¡Todo al día!
            </h3>
            <p className="text-gray-400">
              No hay cards pendientes de moderación en este momento
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingCards.map((card) => (
              <div
                key={card.id}
                className="bg-[#212121] rounded-2xl p-6 border border-[#FFD700]/20"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {card.category && (
                      <span className="text-lg">{categoryEmojis[card.category]}</span>
                    )}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-[#FFD700]">
                          Pendiente de moderación
                        </span>
                        <AlertCircle className="w-4 h-4 text-[#FFD700]" />
                      </div>
                      {card.category && (
                        <span className="text-xs text-gray-400">
                          {categoryLabels[card.category]}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDate(card.createdAt)}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      ID: {card.confessionId}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Resumen para intercesión:</h3>
                  <p className="text-gray-200 leading-relaxed bg-[#424242]/30 rounded-xl p-4">
                    {card.summary}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <Button
                    onClick={() => handleModerate(card.id, 'approve')}
                    disabled={moderatingId === card.id}
                    className="flex-1 bg-[#4CAF50] hover:bg-[#4CAF50]/90 text-white font-semibold py-3 rounded-xl disabled:opacity-50"
                  >
                    {moderatingId === card.id ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Procesando...
                      </div>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Aprobar
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={() => handleModerate(card.id, 'reject')}
                    disabled={moderatingId === card.id}
                    variant="outline"
                    className="flex-1 border-[#F44336] text-[#F44336] hover:bg-[#F44336]/10 py-3 rounded-xl disabled:opacity-50"
                  >
                    {moderatingId === card.id ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-[#F44336] border-t-transparent rounded-full animate-spin mr-2"></div>
                        Procesando...
                      </div>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 mr-2" />
                        Rechazar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Guidelines */}
        <div className="mt-12 bg-[#FFD700]/10 rounded-2xl p-6 border border-[#FFD700]/20">
          <h3 className="text-lg font-semibold text-white mb-4">Guías de Moderación</h3>
          <div className="space-y-2 text-gray-200">
            <p>• Aprueba contenido que sea apropiado para intercesión comunitaria</p>
            <p>• Rechaza contenido que sea demasiado específico o identifique a personas</p>
            <p>• Rechaza contenido inapropiado, ofensivo o que no sea genuino</p>
            <p>• Asegúrate de que el resumen mantenga el anonimato completo</p>
            <p>• Prioriza el bienestar espiritual y emocional de la comunidad</p>
          </div>
        </div>
      </div>
    </div>
  );
}
