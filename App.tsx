
import React, { useState, useMemo } from 'react';
import { CartItem, Dish, View } from './types';
import Header from './components/Header';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Confirmation from './components/Confirmation';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Menu);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (dish: Dish) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.dish.id === dish.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { dish, quantity: 1 }];
    });
  };

  const updateQuantity = (dishId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(dishId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.dish.id === dishId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (dishId: number) => {
    setCart(prevCart => prevCart.filter(item => item.dish.id !== dishId));
  };

  const placeOrder = () => {
    setCart([]);
    setCurrentView(View.Confirmation);
  };
  
  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const renderContent = () => {
    switch (currentView) {
      case View.Cart:
        return (
          <Cart
            cartItems={cart}
            onUpdateQuantity={updateQuantity}
            onPlaceOrder={placeOrder}
            onBackToMenu={() => setCurrentView(View.Menu)}
          />
        );
      case View.Confirmation:
        return <Confirmation onBackToMenu={() => setCurrentView(View.Menu)} />;
      case View.Menu:
      default:
        return <Menu onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="bg-cream min-h-screen font-sans text-gray-800">
      <Header cartItemCount={cartItemCount} onCartClick={() => setCurrentView(View.Cart)} />
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>La Dolce Vita &copy; {new Date().getFullYear()}</p>
        <p>123 Via Roma, 75001 Paris</p>
      </footer>
    </div>
  );
};

export default App;
