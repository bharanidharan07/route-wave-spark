// Mock API Service for PWA Ordering App

export interface User {
  email: string;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  category: 'Wholesale' | 'Simple' | 'Swatch';
  price: number;
  description: string;
}

export interface Order {
  items: Product[];
  deliveryType?: 'Pickup' | 'Freight Forward';
  total?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// Simulated API delays for realistic experience
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Authentication
  login: async (email: string, password: string): Promise<ApiResponse<User>> => {
    console.log("API: Attempting login for", email);
    await simulateDelay(1000);
    return { 
      success: true, 
      data: { email, name: "Rohan Sharma" } 
    };
  },

  signup: async (email: string, password: string): Promise<ApiResponse<User>> => {
    console.log("API: Attempting signup for", email);
    await simulateDelay(1000);
    return { 
      success: true, 
      data: { email, name: "Priya Patel" } 
    };
  },

  // Products
  getProducts: async (): Promise<Product[]> => {
    console.log("API: Fetching products");
    await simulateDelay(1000);
    return [
      { 
        id: 1, 
        name: 'Premium Wholesale Fabric', 
        category: 'Wholesale', 
        price: 25.50, 
        description: 'High-quality cotton blend for large projects.' 
      },
      { 
        id: 2, 
        name: 'Simple Linen Thread', 
        category: 'Simple', 
        price: 5.00, 
        description: 'Durable and versatile for all sewing needs.' 
      },
      { 
        id: 3, 
        name: 'Swatch Sample Kit', 
        category: 'Swatch', 
        price: 15.00, 
        description: 'Explore our latest collection with this sample kit.' 
      },
      { 
        id: 4, 
        name: 'Bulk Silk Rolls', 
        category: 'Wholesale', 
        price: 120.75, 
        description: 'Luxurious silk available in various colors.' 
      },
      { 
        id: 5, 
        name: 'Basic Button Pack', 
        category: 'Simple', 
        price: 8.25, 
        description: 'A pack of 50 assorted buttons.' 
      },
      { 
        id: 6, 
        name: 'Color Swatch Card', 
        category: 'Swatch', 
        price: 2.00, 
        description: 'A single card displaying our new seasonal colors.' 
      },
    ];
  },

  // Orders
  placeOrder: async (order: Order): Promise<ApiResponse<{ orderId: number }>> => {
    console.log("API: Placing order", order);
    await simulateDelay(1500);
    return { 
      success: true, 
      data: { orderId: Math.floor(Math.random() * 100000) } 
    };
  },

  // Feedback
  submitFeedback: async (feedback: 'good' | 'ok' | 'bad'): Promise<ApiResponse<void>> => {
    console.log("API: Submitting feedback", feedback);
    await simulateDelay(500);
    return { success: true };
  }
};