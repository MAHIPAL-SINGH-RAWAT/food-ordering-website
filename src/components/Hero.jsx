import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const scrollToMenu = () => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      {/* Background Animation */}
      <div className="hero-bg">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-element"
            style={{
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-main"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="hero-title"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(255,255,255,0.5)',
                  '0 0 30px rgba(255,255,255,0.8)',
                  '0 0 20px rgba(255,255,255,0.5)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Delicious Food
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Delivered Fresh to Your Door in 30 Minutes!
            </motion.p>
            
            <motion.div
              className="hero-features"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">Fast Delivery</h3>
                <p className="feature-desc">30 minutes or less guaranteed</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌟</div>
                <h3 className="feature-title">Premium Quality</h3>
                <p className="feature-desc">Fresh ingredients, amazing taste</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💯</div>
                <h3 className="feature-title">100% Satisfaction</h3>
                <p className="feature-desc">Money back guarantee</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.button
                className="btn btn-primary hero-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToMenu}
              >
                Order Now 🚀
              </motion.button>
              <motion.button
                className="btn btn-secondary hero-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToMenu}
              >
                View Menu 📱
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Floating Food Icons */}
          <div className="floating-food">
            {['🍕', '🍔', '🍰', '🥤', '🍟', '🌮'].map((emoji, index) => (
              <motion.div
                key={index}
                className="food-emoji"
                style={{
                  left: `${20 + (index * 15)}%`,
                  top: `${30 + (index % 2 * 40)}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3 + index,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;