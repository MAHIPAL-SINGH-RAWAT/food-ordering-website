import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import FeaturedSwiper from './components/FeaturedSwiper';
import Cart from './components/Cart';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item, quantityChange) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantityChange;
        if (newQuantity <= 0) {
          return prevItems.filter(cartItem => cartItem.id !== item.id);
        }
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        );
      } else if (quantityChange > 0) {
        return [...prevItems, { ...item, quantity: quantityChange }];
      }
      
      return prevItems;
    });
  };

  const updateCartItem = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <motion.div
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header cartItems={cartItems} toggleCart={toggleCart} />
      <Hero />
      <FeaturedSwiper 
        addToCart={addToCart} 
        cartItems={cartItems}
      />
      <Menu 
        addToCart={addToCart} 
        cartItems={cartItems}
      />
      <Footer />
      
      <Cart
        isOpen={isCartOpen}
        toggleCart={toggleCart}
        cartItems={cartItems}
        updateCartItem={updateCartItem}
        clearCart={clearCart}
      />

      {/* Floating Elements */}
      <div className="floating-pizza">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="floating-emoji"
        >
          🍕
        </motion.div>
      </div>

      <div className="floating-burger">
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="floating-emoji"
        >
          🍔
        </motion.div>
      </div>
    </motion.div>
  );
}

export default App;