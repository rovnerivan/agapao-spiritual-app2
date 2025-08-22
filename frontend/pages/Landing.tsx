import React from 'react';
import { Flame, Heart, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';

export default function Landing() {
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      // In production, this would integrate with Google OAuth
      const mockGoogleId = `google_${Date.now()}`;
      await login(mockGoogleId);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      
      {/* Divine light effect */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#FFD700] opacity-10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Flame className="w-12 h-12 text-[#FFD700] animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 bg-[#FFD700] opacity-30 rounded-full blur-md"></div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Agapao App
          </h1>
          <p className="text-xl text-[#FFD700] font-medium mb-2">
            Amor Incondicional • Restauración Real
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Un refugio espiritual donde encuentras paz, perdón genuino y comunidad amorosa bajo el amor incondicional de Dios
          </p>
        </header>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-[#212121] rounded-2xl p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300">
            <div className="w-12 h-12 bg-[#FFD700]/20 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-[#FFD700]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Confesión Anónima</h3>
            <p className="text-gray-300 leading-relaxed">
              Comparte tu carga con Dios en completa privacidad. Recibe respuestas llenas de amor y sabiduría bíblica.
            </p>
          </div>

          <div className="bg-[#212121] rounded-2xl p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300">
            <div className="w-12 h-12 bg-[#FFD700]/20 rounded-full flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-[#FFD700]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Intercesión Comunitaria</h3>
            <p className="text-gray-300 leading-relaxed">
              Ora por otros hermanos de forma anónima. Lleva las cargas de la comunidad con amor y compasión.
            </p>
          </div>

          <div className="bg-[#212121] rounded-2xl p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300">
            <div className="w-12 h-12 bg-[#FFD700]/20 rounded-full flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-[#FFD700]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Privacidad Total</h3>
            <p className="text-gray-300 leading-relaxed">
              Tu identidad permanece completamente anónima. Solo Dios conoce tu corazón, nosotros protegemos tu privacidad.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-[#212121]/80 backdrop-blur-sm rounded-3xl p-12 border border-[#FFD700]/30 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Encuentra Paz Aquí
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Tu corazón es seguro aquí. Comienza tu journey de restauración espiritual con la comunidad que te ama incondicionalmente.
            </p>
            
            <Button 
              onClick={handleGoogleLogin}
              className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-semibold text-lg px-12 py-4 rounded-full shadow-lg hover:shadow-[#FFD700]/30 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Comienza tu Restauración
            </Button>
            
            <p className="text-sm text-gray-400 mt-6">
              Autenticación segura con Google • Completamente anónimo
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar." - Mateo 11:28
          </p>
        </footer>
      </div>
    </div>
  );
}
