import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedText } from '@/components/ui/animated-text';
import { AppCard } from '@/components/ui/app-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/services/api';

export const AuthScreen = ({ onUserLogin }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const action = isLogin ? api.login : api.signup;
      const response = await action(email, password);
      
      if (response.success && response.data) {
        onUserLogin(response.data);
        toast({
          title: "Success!",
          description: isLogin ? "Welcome back!" : "Account created successfully!",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Authentication failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-surface">
      <AppCard className="w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <AnimatedText 
            text={isLogin ? "Welcome Back" : "Create Account"} 
            className="text-3xl font-bold text-text-primary mb-2" 
          />
          <p className="text-text-secondary">
            {isLogin ? "Sign in to continue" : "Get started with us"}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full"
            variant="gradient"
            size="lg"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </Button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-sm text-text-secondary">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="mt-1"
          >
            {isLogin ? 'Create Account' : 'Sign In'}
          </Button>
        </div>
      </AppCard>
    </div>
  );
};