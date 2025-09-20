import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Pages
import { SplashScreen } from "./pages/splash";
import { AuthScreen } from "./pages/auth";
import { DashboardScreen } from "./pages/dashboard";
import { DeliveryScreen } from "./pages/delivery";
import { OrderScreen } from "./pages/order";
import { FeedbackScreen } from "./pages/feedback";
import NotFound from "./pages/NotFound";

// Types
import { type User, type Product } from "./services/api";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

  // Service Worker Registration for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch(err => {
            console.log('ServiceWorker registration failed: ', err);
          });
      });
    }
  }, []);

  const handleUserLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route 
              path="/auth" 
              element={<AuthScreen onUserLogin={handleUserLogin} />} 
            />
            <Route 
              path="/dashboard" 
              element={
                user ? (
                  <DashboardScreen 
                    user={user} 
                    cart={cart} 
                    onAddToCart={handleAddToCart}
                    onLogout={handleLogout}
                  />
                ) : (
                  <AuthScreen onUserLogin={handleUserLogin} />
                )
              } 
            />
            <Route 
              path="/delivery" 
              element={
                user ? <DeliveryScreen /> : <AuthScreen onUserLogin={handleUserLogin} />
              } 
            />
            <Route 
              path="/order" 
              element={
                user ? (
                  <OrderScreen cart={cart} onClearCart={handleClearCart} />
                ) : (
                  <AuthScreen onUserLogin={handleUserLogin} />
                )
              } 
            />
            <Route 
              path="/feedback" 
              element={
                user ? <FeedbackScreen /> : <AuthScreen onUserLogin={handleUserLogin} />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
