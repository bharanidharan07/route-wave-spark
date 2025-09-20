import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AppCard } from "@/components/ui/app-card";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-surface">
      <AppCard className="w-full max-w-md text-center animate-scale-in">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-2">Page Not Found</h2>
          <p className="text-text-secondary">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button asChild variant="gradient" size="lg" className="w-full">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </AppCard>
    </div>
  );
};

export default NotFound;
