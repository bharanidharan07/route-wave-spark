import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedText } from '@/components/ui/animated-text';
import { Package } from 'lucide-react';

export const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-hero text-primary-foreground page-enter-active">
      <div className="animate-scale-in">
        <Package className="w-24 h-24 mb-6 animate-pulse-glow" />
      </div>
      <AnimatedText 
        text="Ordering PWA" 
        className="text-4xl font-bold tracking-wider text-center" 
      />
      <p className="mt-4 text-lg opacity-80 animate-fade-in-up">
        Professional Ordering Experience
      </p>
    </div>
  );
};