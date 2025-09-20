import { useNavigate } from 'react-router-dom';
import { AnimatedText } from '@/components/ui/animated-text';
import { AppCard } from '@/components/ui/app-card';
import { Button } from '@/components/ui/button';
import { Truck, Package } from 'lucide-react';

export const DeliveryScreen = () => {
  const navigate = useNavigate();

  const handleDeliveryChoice = (type) => {
    // Store delivery choice in localStorage or state
    localStorage.setItem('deliveryType', type);
    navigate('/order');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-surface">
      <AppCard className="w-full max-w-md text-center animate-scale-in">
        <AnimatedText 
          text="Delivery Options" 
          className="text-3xl font-bold text-text-primary mb-8" 
        />
        
        <div className="space-y-4">
          <Button 
            onClick={() => handleDeliveryChoice('Pickup')}
            variant="accent"
            size="lg"
            className="w-full h-16 text-lg"
          >
            <Package className="mr-3 h-6 w-6" />
            Store Pickup
          </Button>
          
          <Button 
            onClick={() => handleDeliveryChoice('Freight Forward')}
            variant="secondary"
            size="lg"
            className="w-full h-16 text-lg"
          >
            <Truck className="mr-3 h-6 w-6" />
            Freight Forward
          </Button>
        </div>
        
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mt-8"
        >
          Back to Dashboard
        </Button>
      </AppCard>
    </div>
  );
};