import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedText } from '@/components/ui/animated-text';
import { AppCard } from '@/components/ui/app-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/services/api';
import { ArrowLeft } from 'lucide-react';

export const OrderScreen = ({ cart, onClearCart }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [placingOrder, setPlacingOrder] = useState(false);

  const deliveryType = localStorage.getItem('deliveryType') || 'Pickup';
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    
    try {
      const response = await api.placeOrder({ 
        items: cart, 
        deliveryType,
        total: totalPrice 
      });
      
      if (response.success) {
        onClearCart();
        toast({
          title: "Order Placed Successfully!",
          description: `Order #${response.data?.orderId} has been confirmed.`,
        });
        navigate('/feedback');
      }
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleSaveForLater = () => {
    // In a real app, this would save to user's account
    console.log("Saving cart for later:", cart);
    onClearCart();
    toast({
      title: "Cart Saved",
      description: "Your items have been saved for later.",
    });
    navigate('/dashboard');
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <AppCard className="w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Cart Empty</h2>
          <p className="text-text-secondary mb-6">Add some items to your cart first.</p>
          <Button onClick={() => navigate('/dashboard')} variant="accent">
            Continue Shopping
          </Button>
        </AppCard>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-surface">
      <AppCard className="w-full max-w-lg animate-scale-in">
        <AnimatedText 
          text="Confirm Your Order" 
          className="text-3xl font-bold text-text-primary mb-6 text-center" 
        />
        
        {/* Delivery Type */}
        <div className="mb-6">
          <Badge variant="outline" className="mb-2">
            {deliveryType}
          </Badge>
        </div>
        
        {/* Cart Items */}
        <div className="space-y-3 max-h-64 overflow-y-auto mb-6">
          {cart.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="flex justify-between items-center bg-surface p-3 rounded-lg"
            >
              <div className="flex-1">
                <span className="font-medium text-text-primary">{item.name}</span>
                <Badge className="ml-2 text-xs" variant="secondary">
                  {item.category}
                </Badge>
              </div>
              <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        {/* Total */}
        <div className="border-t border-border pt-4 mb-8">
          <div className="flex justify-between items-center text-xl font-bold">
            <span className="text-text-primary">Total:</span>
            <span className="text-primary">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button 
            onClick={handlePlaceOrder} 
            disabled={placingOrder} 
            variant="success"
            size="lg"
          >
            {placingOrder ? 'Placing Order...' : 'Place Order'}
          </Button>
          
          <Button 
            onClick={handleSaveForLater} 
            variant="outline"
            size="lg"
          >
            Save for Later
          </Button>
        </div>
        
        <Button
          variant="ghost"
          onClick={() => navigate('/delivery')}
          className="w-full"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Delivery Options
        </Button>
      </AppCard>
    </div>
  );
};