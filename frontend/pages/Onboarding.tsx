import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Globe, Heart } from 'lucide-react';

const countries = [
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺' },
  { code: 'DO', name: 'República Dominicana', flag: '🇩🇴' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳' },
  { code: 'MX', name: 'México', flag: '🇲🇽' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
  { code: 'PA', name: 'Panamá', flag: '🇵🇦' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'PE', name: 'Perú', flag: '🇵🇪' },
  { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷' },
  { code: 'ES', name: 'España', flag: '🇪🇸' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸' },
  { code: 'OTHER', name: 'Otro país', flag: '🌍' },
];

export default function Onboarding() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setCountry } = useAuth();
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!selectedCountry) return;
    
    setIsLoading(true);
    try {
      await setCountry(selectedCountry);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error setting country:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Heart className="w-16 h-16 text-[#FFD700] animate-pulse" />
              <div className="absolute inset-0 w-16 h-16 bg-[#FFD700] opacity-30 rounded-full blur-lg"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Bienvenido/a a Agapao
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Para personalizar tu experiencia espiritual, necesitamos conocer tu ubicación
          </p>
        </div>

        {/* Country Selection */}
        <div className="bg-[#212121] rounded-2xl p-8 border border-[#FFD700]/20">
          <div className="flex items-center mb-6">
            <Globe className="w-6 h-6 text-[#FFD700] mr-3" />
            <h2 className="text-xl font-semibold text-white">Selecciona tu país</h2>
          </div>
          
          <div className="space-y-6">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full bg-[#424242]/80 border-[#FFD700]/20 text-white h-14 text-lg">
                <SelectValue placeholder="Elige tu país..." />
              </SelectTrigger>
              <SelectContent className="bg-[#212121] border-[#FFD700]/20">
                {countries.map((country) => (
                  <SelectItem 
                    key={country.code} 
                    value={country.code}
                    className="text-white hover:bg-[#424242] focus:bg-[#424242] text-lg py-3"
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={handleContinue}
              disabled={!selectedCountry || isLoading}
              className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-semibold text-lg py-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                  Preparando tu refugio...
                </div>
              ) : (
                'Continuar a mi refugio'
              )}
            </Button>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400 leading-relaxed">
            Tu ubicación nos ayuda a personalizar contenido relevante. 
            <br />
            Tu identidad permanece completamente anónima.
          </p>
        </div>
      </div>
    </div>
  );
}
