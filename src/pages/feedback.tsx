import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedText } from '@/components/ui/animated-text';
import { AppCard } from '@/components/ui/app-card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/services/api';

export const FeedbackScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleFeedback = async (feedback: 'good' | 'ok' | 'bad') => {
    setSubmitting(true);
    
    try {
      await api.submitFeedback(feedback);
      toast({
        title: "Thank You!",
        description: "Your feedback helps us improve our service.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-surface">
      <AppCard className="w-full max-w-md text-center animate-scale-in">
        <AnimatedText 
          text="How was your experience?" 
          className="text-3xl font-bold text-text-primary mb-4" 
        />
        
        <p className="text-text-secondary mb-8">
          Your feedback helps us serve you better
        </p>
        
        <div className="flex justify-center gap-8 mb-8">
          <button 
            onClick={() => handleFeedback('good')}
            disabled={submitting}
            className="text-6xl transform hover:scale-125 transition-transform duration-300 disabled:opacity-50"
            aria-label="Good experience"
          >
            😊
          </button>
          
          <button 
            onClick={() => handleFeedback('ok')}
            disabled={submitting}
            className="text-6xl transform hover:scale-125 transition-transform duration-300 disabled:opacity-50"
            aria-label="Okay experience"
          >
            😐
          </button>
          
          <button 
            onClick={() => handleFeedback('bad')}
            disabled={submitting}
            className="text-6xl transform hover:scale-125 transition-transform duration-300 disabled:opacity-50"
            aria-label="Bad experience"
          >
            😠
          </button>
        </div>
        
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          disabled={submitting}
        >
          Skip Feedback
        </Button>
      </AppCard>
    </div>
  );
};