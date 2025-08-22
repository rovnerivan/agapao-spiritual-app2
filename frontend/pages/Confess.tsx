import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../contexts/AuthContext';

const categories = [
  { id: 'anger', label: 'Ira y Enojo', emoji: '😤' },
  { id: 'lust', label: 'Lujuria y Pureza', emoji: '💔' },
  { id: 'lies', label: 'Mentira y Engaño', emoji: '🤥' },
  { id: 'pride', label: 'Orgullo y Soberbia', emoji: '👑' },
  { id: 'envy', label: 'Envidia y Celos', emoji: '😒' },
  { id: 'addictions', label: 'Adicciones', emoji: '⛓️' },
  { id: 'relationships', label: 'Relaciones', emoji: '💕' },
  { id: 'other', label: 'Otros', emoji: '🤲' },
];

export default function Confess() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [allowIntercession, setAllowIntercession] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Contenido requerido",
        description: "Por favor comparte lo que hay en tu corazón",
        variant: "destructive",
      });
      return;
    }

    if (content.length > 2000) {
      toast({
        title: "Contenido muy largo",
        description: "Por favor mantén tu confesión bajo 2000 caracteres",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock confession ID
      const confessionId = `confession_${Date.now()}`;
      
      // Update user stats
      const savedStats = localStorage.getItem('agapao_user_stats');
      const stats = savedStats ? JSON.parse(savedStats) : { confessions: 0, prayers: 0, daysActive: 1 };
      stats.confessions += 1;
      localStorage.setItem('agapao_user_stats', JSON.stringify(stats));
      
      // Store confession for demo
      const confession = {
        id: confessionId,
        content,
        category: selectedCategory,
        allowIntercession,
        status: 'processing',
        createdAt: new Date().toISOString(),
      };
      
      const savedConfessions = localStorage.getItem('agapao_confessions') || '[]';
      const confessions = JSON.parse(savedConfessions);
      confessions.push(confession);
      localStorage.setItem('agapao_confessions', JSON.stringify(confessions));
      
      toast({
        title: "Tu confesión ha sido recibida",
        description: "Dios está preparando una palabra especial para ti",
      });
      
      navigate(`/restore/${confessionId}`);
    } catch (error) {
      console.error('Error submitting confession:', error);
      toast({
        title: "Error al enviar",
        description: "Algo falló, pero el amor de Dios permanece. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Heart className="w-6 h-6 text-[#FFD700] mr-3" />
              <h1 className="text-xl font-bold text-white">Comparte tu carga con Dios</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Content */}
          <div className="bg-[#212121]/90 rounded-3xl p-8 border-2 border-[#FFD700]/20 backdrop-blur-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-3">Tu corazón es seguro aquí</h2>
              <p className="text-gray-300 leading-relaxed">
                Comparte libremente lo que pesa en tu corazón. Dios te escucha con amor incondicional y sin juicio.
              </p>
            </div>

            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe aquí lo que hay en tu corazón... Dios te escucha con amor y sin juicio."
              className="min-h-[200px] bg-[#424242]/80 border-[#FFD700]/20 text-white text-lg placeholder:text-gray-400 resize-none focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20"
              maxLength={2000}
            />
            
            <div className="flex justify-between items-center mt-3">
              <p className="text-sm text-gray-400">
                {content.length}/2000 caracteres
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></div>
                <p className="text-sm text-[#FFD700]">Escuchando con amor</p>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-[#212121] rounded-2xl p-6 border border-[#FFD700]/10">
            <h3 className="text-lg font-semibold text-white mb-4">Categoría (opcional)</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'border-[#FFD700] bg-[#FFD700]/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={selectedCategory === category.id}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-xl mr-3">{category.emoji}</span>
                  <span className="text-white text-sm">{category.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Intercession Consent */}
          <div className="bg-[#212121] rounded-2xl p-6 border border-[#4CAF50]/20">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="intercession"
                checked={allowIntercession}
                onCheckedChange={(checked) => setAllowIntercession(checked as boolean)}
                className="mt-1 border-[#4CAF50] data-[state=checked]:bg-[#4CAF50]"
              />
              <div>
                <label htmlFor="intercession" className="text-white font-medium cursor-pointer">
                  Permitir intercesión comunitaria
                </label>
                <p className="text-sm text-gray-300 mt-1 leading-relaxed">
                  Si lo deseas, otros hermanos podrán orar por tu situación de forma completamente anónima. 
                  Tu identidad permanecerá siempre protegida.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-semibold text-lg py-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[#FFD700]/30"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-3"></div>
                Preparando tu palabra de aliento...
              </div>
            ) : (
              <div className="flex items-center">
                <Send className="w-5 h-5 mr-3" />
                Liberar mi corazón
              </div>
            )}
          </Button>
        </form>

        {/* Encouragement */}
        <div className="text-center mt-12">
          <div className="bg-[#FFD700]/10 rounded-2xl p-6 border border-[#FFD700]/20">
            <p className="text-lg text-[#FFF8DC] italic leading-relaxed">
              "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar."
            </p>
            <p className="text-sm text-[#FFD700] mt-2">Mateo 11:28</p>
          </div>
        </div>
      </div>
    </div>
  );
}
