import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import './Cart.css';

const Cart = ({ isOpen, toggleCart, cartItems, updateCartItem, clearCart }) => {
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const delivery = subtotal > 25 ? 0 : 3.99;
  const total = subtotal + tax + delivery;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    alert(`Order placed successfully! 🎉\n\nTotal: $${total.toFixed(2)}\nExpected delivery: 30-45 minutes`);
    clearCart();
    toggleCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
          />

          {/* Cart Sidebar */}
          <motion.div
            className="cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="cart-container">
              {/* Header */}
              <div className="cart-header">
                <div className="cart-title-section">
                  <ShoppingBag className="cart-icon" size={24} />
                  <h2 className="cart-title">Your Cart</h2>
                </div>
                <motion.button
                  onClick={toggleCart}
                  className="close-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="cart-items">
                {cartItems.length === 0 ? (
                  <motion.div
                    className="empty-cart"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="empty-icon">🛒</div>
                    <p className="empty-title">Your cart is empty</p>
                    <p className="empty-subtitle">Add some delicious items!</p>
                  </motion.div>
                ) : (
                  <div className="items-list">
                    <AnimatePresence>
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          className="cart-item"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20, scale: 0.8 }}
                          layout
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="item-images"
                          />
                          
                          <div className="item-details">
                            <h3 className="item-name">{item.name}</h3>
                            <p className="item-price">${item.price.toFixed(2)}</p>
                          </div>
                          
                          <div className="item-controls">
                            <motion.button
                              className="control-btn minus"
                              onClick={() => updateCartItem(item.id, item.quantity - 1)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Minus size={14} />
                            </motion.button>
                            
                            <span className="quantity">{item.quantity}</span>
                            
                            <motion.button
                              className="control-btn plus"
                              onClick={() => updateCartItem(item.id, item.quantity + 1)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Plus size={14} />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              {cartItems.length > 0 && (
                <motion.div
                  className="order-summary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="summary-details">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Delivery</span>
                      <span>{delivery === 0 ? 'Free' : `$${delivery.toFixed(2)}`}</span>
                    </div>
                    <div className="summary-total">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <motion.button
                    className="checkout-btn"
                    onClick={handleCheckout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Checkout - ${total.toFixed(2)}
                  </motion.button>

                  <motion.button
                    className="clear-btn"
                    onClick={clearCart}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear Cart
                  </motion.button>

                  {subtotal < 25 && (
                    <motion.p
                      className="delivery-notice"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Add ${(25 - subtotal).toFixed(2)} more for free delivery!
                    </motion.p>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;