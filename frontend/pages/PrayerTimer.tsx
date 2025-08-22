import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Play, Pause, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function PrayerTimer() {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [cardSummary, setCardSummary] = useState('');

  useEffect(() => {
    // Load card summary
    setCardSummary('Hermano/a luchando con pensamientos de ira hacia un familiar. Busca paz y perdón en su corazón.');
  }, [cardId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleComplete = async () => {
    try {
      // Update prayer count
      const savedStats = localStorage.getItem('agapao_user_stats');
      const stats = savedStats ? JSON.parse(savedStats) : { confessions: 0, prayers: 0, daysActive: 1 };
      stats.prayers += 1;
      localStorage.setItem('agapao_user_stats', JSON.stringify(stats));
      
      toast({
        title: "¡Oración completada!",
        description: "Tu intercesión ha sido registrada. Dios bendiga tu corazón generoso.",
      });
      
      navigate('/intercede');
    } catch (error) {
      console.error('Error completing prayer:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al registrar tu oración. Intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  const progressPercentage = ((300 - timeLeft) / 300) * 100;

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-sm border-b border-[#FFD700]/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button
              onClick={() => navigate('/intercede')}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center">
              <Heart className="w-6 h-6 text-[#4CAF50] mr-3" />
              <h1 className="text-xl font-bold text-white">Tiempo de intercesión</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Card Summary */}
        <div className="bg-[#212121] rounded-2xl p-6 border border-[#4CAF50]/20 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Orando por:</h2>
          <p className="text-gray-200 leading-relaxed">
            {cardSummary}
          </p>
        </div>

        {/* Timer Circle */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255, 215, 0, 0.1)"
                strokeWidth="3"
                fill="transparent"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#FFD700"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFD700] mb-2">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-gray-400">
                  {isCompleted ? 'Completado' : 'restantes'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="text-center space-y-6">
          {!isCompleted ? (
            <>
              <Button
                onClick={handleStartPause}
                className="bg-[#4CAF50] hover:bg-[#4CAF50]/90 text-white font-semibold text-lg px-12 py-4 rounded-full transform hover:-translate-y-1 transition-all duration-300"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-6 h-6 mr-3" />
                    Pausar oración
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6 mr-3" />
                    {timeLeft === 300 ? 'Comenzar oración' : 'Continuar oración'}
                  </>
                )}
              </Button>
              
              {timeLeft < 300 && (
                <Button
                  onClick={handleComplete}
                  variant="outline"
                  className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 px-8 py-3 rounded-full"
                >
                  Terminar ahora
                </Button>
              )}
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-center text-[#4CAF50] text-xl font-semibold">
                <CheckCircle className="w-8 h-8 mr-3" />
                ¡Oración completada!
              </div>
              
              <Button
                onClick={handleComplete}
                className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-semibold text-lg px-12 py-4 rounded-full transform hover:-translate-y-1 transition-all duration-300"
              >
                Continuar intercediendo
              </Button>
            </div>
          )}
        </div>

        {/* Prayer Guide */}
        <div className="mt-12 bg-[#FFD700]/10 rounded-2xl p-6 border border-[#FFD700]/20">
          <h3 className="text-lg font-semibold text-white mb-4">Guía de intercesión</h3>
          <div className="space-y-3 text-gray-200">
            <p>• Ora por paz en el corazón de esta persona</p>
            <p>• Pide sabiduría divina para su situación</p>
            <p>• Intercede por fortaleza espiritual</p>
            <p>• Ora por restauración en sus relaciones</p>
            <p>• Pide que sienta el amor incondicional de Dios</p>
          </div>
        </div>

        {/* Encouragement */}
        <div className="text-center mt-8">
          <div className="bg-[#4CAF50]/10 rounded-2xl p-6 border border-[#4CAF50]/20">
            <p className="text-lg text-[#4CAF50] italic leading-relaxed">
              "La oración eficaz del justo puede mucho."
            </p>
            <p className="text-sm text-[#4CAF50] mt-2">Santiago 5:16</p>
          </div>
        </div>
      </div>
    </div>
  );
}
