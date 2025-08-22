import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, BookOpen, Hands, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AIResponse {
  empathyText: string;
  bibleVerse: string;
  bibleReference: string;
  reflectionText: string;
  prayerGuide: string;
  encouragementText: string;
}

export default function Restore() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState<AIResponse | null>(null);

  useEffect(() => {
    const loadResponse = async () => {
      setIsLoading(true);
      
      // Simulate API loading time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock AI response
      const mockResponse: AIResponse = {
        empathyText: "Entiendo el peso que llevas en tu corazón. No estás solo/a en esta lucha, y tu valentía para buscar ayuda muestra la obra del Espíritu Santo en tu vida. Dios ve tu dolor y tu deseo de cambio.",
        bibleVerse: "Mas él herido fue por nuestras rebeliones, molido por nuestros pecados; el castigo de nuestra paz fue sobre él, y por su llaga fuimos nosotros curados.",
        bibleReference: "Isaías 53:5",
        reflectionText: "El amor de Dios por ti no depende de tu perfección, sino de Su naturaleza perfecta. Cada vez que caes, Él está ahí para levantarte. La culpa que sientes es una invitación a regresar a Sus brazos amorosos. Cristo ya pagó el precio por todo lo que te avergüenza, y Su gracia es suficiente para transformar tu corazón. No permitas que el enemigo te convenza de que eres demasiado sucio/a para ser amado/a. En Cristo, eres una nueva criatura, y Su misericordia se renueva cada mañana.",
        prayerGuide: "Padre celestial, vengo ante Ti reconociendo mi necesidad de Tu gracia. Gracias por amarme incondicionalmente, aún en mis fallas. Te pido perdón por [menciona específicamente tu lucha]. Ayúdame a ver mi identidad a través de Tus ojos, no de mis errores. Fortalece mi espíritu para resistir la tentación y llena mi corazón con Tu paz. Dame sabiduría para tomar decisiones que honren Tu nombre. En el nombre de Jesús, amén.",
        encouragementText: "Tu historia no termina con tu error. Dios está escribiendo un capítulo hermoso de redención en tu vida. Cada día es una nueva oportunidad para caminar en Su gracia. Eres amado/a, eres valioso/a, y tienes un propósito divino que cumplir."
      };
      
      setResponse(mockResponse);
      setIsLoading(false);
    };

    loadResponse();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <Heart className="w-8 h-8 text-[#FFD700] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Preparando tu palabra de aliento</h2>
          <p className="text-gray-300 leading-relaxed">
            Dios está preparando una respuesta llena de amor especialmente para ti...
          </p>
          <div className="flex justify-center space-x-1 mt-6">
            <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">Error al cargar la respuesta</p>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            Volver al inicio
          </Button>
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
              <Sparkles className="w-6 h-6 text-[#FFD700] mr-3" />
              <h1 className="text-xl font-bold text-white">Tu palabra de restauración</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-8">
          {/* Empathy Section */}
          <div className="bg-[#212121] rounded-2xl p-8 border border-[#FFD700]/20">
            <div className="flex items-center mb-6">
              <Heart className="w-8 h-8 text-[#FFD700] mr-3" />
              <h2 className="text-2xl font-bold text-white">Dios te ve y te entiende</h2>
            </div>
            <p className="text-lg text-gray-200 leading-relaxed">
              {response.empathyText}
            </p>
          </div>

          {/* Bible Verse */}
          <div className="bg-[#FFD700]/10 rounded-2xl p-8 border border-[#FFD700]/30 relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-20">
              <BookOpen className="w-12 h-12 text-[#FFD700]" />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-[#FFD700] mb-4 text-center">
                Palabra de Dios para ti
              </h3>
              <blockquote className="text-xl text-[#FFD700] italic text-center leading-relaxed mb-4">
                "{response.bibleVerse}"
              </blockquote>
              <p className="text-[#FFD700] text-center font-medium">
                {response.bibleReference}
              </p>
            </div>
          </div>

          {/* Reflection */}
          <div className="bg-[#212121] rounded-2xl p-8 border border-[#FFD700]/10">
            <h3 className="text-xl font-bold text-white mb-6">Reflexión de amor</h3>
            <p className="text-lg text-gray-200 leading-relaxed">
              {response.reflectionText}
            </p>
          </div>

          {/* Prayer Guide */}
          <div className="bg-[#FFF8DC]/10 rounded-2xl p-8 border border-[#FFF8DC]/20">
            <div className="flex items-center mb-6">
              <Hands className="w-8 h-8 text-[#FFF8DC] mr-3" />
              <h3 className="text-xl font-bold text-white">Guía de oración</h3>
            </div>
            <div className="bg-[#424242]/30 rounded-xl p-6">
              <p className="text-lg text-[#FFF8DC] leading-relaxed italic">
                {response.prayerGuide}
              </p>
            </div>
          </div>

          {/* Encouragement */}
          <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/10 rounded-2xl p-8 border border-[#FFD700]/30">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              Palabra de aliento y esperanza
            </h3>
            <p className="text-lg text-white leading-relaxed text-center">
              {response.encouragementText}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => navigate('/confess')}
              className="flex-1 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-semibold py-3 rounded-full"
            >
              Nueva confesión
            </Button>
            <Button
              onClick={() => navigate('/intercede')}
              variant="outline"
              className="flex-1 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 py-3 rounded-full"
            >
              Orar por otros
            </Button>
          </div>
        </div>

        {/* Final Blessing */}
        <div className="text-center mt-12">
          <div className="bg-[#FFD700]/5 rounded-2xl p-6 border border-[#FFD700]/10">
            <p className="text-gray-300 italic">
              "La paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús."
            </p>
            <p className="text-sm text-[#FFD700] mt-2">Filipenses 4:7</p>
          </div>
        </div>
      </div>
    </div>
  );
}
