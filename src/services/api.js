// Mock API Service for PWA Ordering App

// Simulated API delays for realistic experience
const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Authentication
  login: async (email, password) => {
    console.log("API: Attempting login for", email);
    await simulateDelay(1000);
    return { 
      success: true, 
      data: { email, name: "Rohan Sharma" } 
    };
  },

  signup: async (email, password) => {
    console.log("API: Attempting signup for", email);
    await simulateDelay(1000);
    return { 
      success: true, 
      data: { email, name: "Priya Patel" } 
    };
  },

  // Products
  getProducts: async () => {
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
  placeOrder: async (order) => {
    console.log("API: Placing order", order);
    await simulateDelay(1500);
    return { 
      success: true, 
      data: { orderId: Math.floor(Math.random() * 100000) } 
    };
  },

  // Feedback
  submitFeedback: async (feedback) => {
    console.log("API: Submitting feedback", feedback);
    await simulateDelay(500);
    return { success: true };
  }
};