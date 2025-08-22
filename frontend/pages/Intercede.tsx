import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Heart, Clock, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface IntercessionCard {
  id: string;
  summary: string;
  category?: string;
  prayerCount: number;
  timeAgo: string;
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

export default function Intercede() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<IntercessionCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<IntercessionCard[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredCards(cards);
    } else {
      setFilteredCards(cards.filter(card => card.category === selectedCategory));
    }
  }, [cards, selectedCategory]);

  const loadCards = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data
    const mockCards: IntercessionCard[] = [
      {
        id: '1',
        summary: 'Hermano/a luchando con pensamientos de ira hacia un familiar. Busca paz y perdón en su corazón.',
        category: 'anger',
        prayerCount: 12,
        timeAgo: '2 horas atrás',
      },
      {
        id: '2',
        summary: 'Persona enfrentando tentaciones que la alejan de Dios. Necesita fortaleza espiritual.',
        category: 'lust',
        prayerCount: 8,
        timeAgo: '4 horas atrás',
      },
      {
        id: '3',
        summary: 'Alguien que ha mentido a sus seres queridos y busca valor para decir la verdad.',
        category: 'lies',
        prayerCount: 15,
        timeAgo: '6 horas atrás',
      },
      {
        id: '4',
        summary: 'Hermano/a luchando con orgullo en su trabajo. Quiere ser más humilde y servicial.',
        category: 'pride',
        prayerCount: 5,
        timeAgo: '1 día atrás',
      },
      {
        id: '5',
        summary: 'Persona enfrentando problemas en su matrimonio. Busca sabiduría y restauración.',
        category: 'relationships',
        prayerCount: 23,
        timeAgo: '1 día atrás',
      },
    ];
    
    setCards(mockCards);
    setIsLoading(false);
  };

  const handlePrayForCard = (cardId: string) => {
    navigate(`/pray/${cardId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#4CAF50] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando hermanos que necesitan oración...</p>
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
              <Users className="w-6 h-6 text-[#4CAF50] mr-3" />
              <h1 className="text-xl font-bold text-white">Ora por tus hermanos</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Lleva las cargas de otros con amor
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Cada oración cuenta. Al interceder por otros, participas en el amor de Cristo y fortaleces a la comunidad de fe.
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64 bg-[#212121] border-[#FFD700]/20 text-white">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent className="bg-[#212121] border-[#FFD700]/20">
                <SelectItem value="all" className="text-white hover:bg-[#424242]">
                  Todas las categorías
                </SelectItem>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <SelectItem 
                    key={key} 
                    value={key}
                    className="text-white hover:bg-[#424242]"
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{categoryEmojis[key]}</span>
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cards Grid */}
        {filteredCards.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No hay cargas por llevar en esta categoría
            </h3>
            <p className="text-gray-400">
              Revisa otras categorías o vuelve más tarde
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className="bg-[#212121] rounded-2xl p-6 border border-[#4CAF50]/20 hover:border-[#4CAF50]/40 transform hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Category Badge */}
                {card.category && (
                  <div className="flex items-center mb-4">
                    <span className="text-lg mr-2">{categoryEmojis[card.category]}</span>
                    <span className="text-sm text-[#4CAF50] bg-[#4CAF50]/20 px-3 py-1 rounded-full">
                      {categoryLabels[card.category]}
                    </span>
                  </div>
                )}

                {/* Summary */}
                <p className="text-gray-200 leading-relaxed mb-6 line-clamp-4">
                  {card.summary}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {card.timeAgo}
                  </div>
                  <div className="flex items-center text-sm">
                    <Heart className="w-4 h-4 text-[#4CAF50] mr-1" />
                    <span className="text-[#4CAF50] font-medium">
                      {card.prayerCount} oraciones
                    </span>
                  </div>
                </div>

                {/* Prayer Button */}
                <Button
                  onClick={() => handlePrayForCard(card.id)}
                  className="w-full bg-[#4CAF50]/20 hover:bg-[#4CAF50]/30 text-[#4CAF50] border border-[#4CAF50]/30 hover:border-[#4CAF50]/50 font-semibold py-3 rounded-full transition-all duration-300 group-hover:bg-[#4CAF50] group-hover:text-white"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Orar por esta persona
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Encouragement */}
        <div className="text-center mt-16">
          <div className="bg-[#4CAF50]/10 rounded-2xl p-6 border border-[#4CAF50]/20 max-w-2xl mx-auto">
            <p className="text-lg text-[#4CAF50] italic leading-relaxed">
              "Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo."
            </p>
            <p className="text-sm text-[#4CAF50] mt-2">Gálatas 6:2</p>
          </div>
        </div>
      </div>
    </div>
  );
}
