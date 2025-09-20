import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCard } from '@/components/ui/app-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { api, type User, type Product } from '@/services/api';
import { Search, ShoppingCart, LogOut, Camera } from 'lucide-react';

interface DashboardProps {
  user: User;
  cart: Product[];
  onAddToCart: (product: Product) => void;
  onLogout: () => void;
}

export const DashboardScreen = ({ user, cart, onAddToCart, onLogout }: DashboardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'All' | 'Wholesale' | 'Simple' | 'Swatch'>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [toast]);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'All' || p.category === filter)
  );

  const getCategoryColor = (category: Product['category']) => {
    switch (category) {
      case 'Wholesale': return 'bg-secondary text-secondary-foreground';
      case 'Simple': return 'bg-success text-success-foreground';
      case 'Swatch': return 'bg-warning text-warning-foreground';
      default: return 'bg-surface text-text-secondary';
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-surface">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary animate-slide-in">
            Welcome, {user.name}
          </h1>
          <p className="text-text-secondary mt-1">Discover our latest products</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon">
            <Camera className="h-5 w-5" />
          </Button>
          <Button variant="destructive" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4 animate-fade-in-up">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-5 w-5" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {(['All', 'Wholesale', 'Simple', 'Swatch'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <AppCard 
              key={product.id} 
              hover 
              className="flex flex-col justify-between animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div>
                <Badge className={`mb-3 ${getCategoryColor(product.category)}`}>
                  {product.category}
                </Badge>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {product.name}
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  {product.description}
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <Button 
                  onClick={() => handleAddToCart(product)}
                  variant="accent"
                  size="sm"
                >
                  Add to Cart
                </Button>
              </div>
            </AppCard>
          ))}
        </div>
      )}

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => navigate('/delivery')}
            variant="success"
            size="icon"
            className="w-16 h-16 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all relative"
          >
            <ShoppingCart className="h-8 w-8" />
            <Badge className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground min-w-[1.5rem] h-6 rounded-full flex items-center justify-center text-xs">
              {cart.length}
            </Badge>
          </Button>
        </div>
      )}
    </div>
  );
};