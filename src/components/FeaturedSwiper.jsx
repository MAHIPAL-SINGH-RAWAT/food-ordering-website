import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import './FeaturedSwiper.css';

const FeaturedSwiper = ({ addToCart, cartItems }) => {
  const featuredItems = [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Fresh tomatoes, mozzarella cheese, basil leaves',
      price: 12.99,
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      category: 'pizza'
    },
    {
      id: 5,
      name: 'Classic Cheeseburger',
      description: 'Beef patty, cheese, lettuce, tomato, onion, pickles',
      price: 8.99,
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      category: 'burgers'
    },
    {
      id: 9,
      name: 'Chocolate Cake',
      description: 'Rich chocolate cake with chocolate frosting',
      price: 6.99,
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      category: 'desserts'
    },
    {
      id: 14,
      name: 'Fresh Orange Juice',
      description: 'Freshly squeezed orange juice',
      price: 4.99,
      image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      category: 'drinks'
    },
    {
      id: 3,
      name: 'Meat Lovers Pizza',
      description: 'Pepperoni, sausage, ham, bacon, ground beef',
      price: 19.99,
      image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      category: 'pizza'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredItems.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  return (
    <section id="featured" className="featured-section">
      <div className="container">
        <motion.div
          className="featured-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="featured-title">Featured Specials</h2>
          <p className="featured-subtitle">Our most popular dishes, loved by customers</p>
        </motion.div>

        <div 
          className="swiper-container"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Swiper */}
          <div className="swiper-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="swiper-slide"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="slide-overlay"></div>
                <img
                  src={featuredItems[currentIndex].image}
                  alt={featuredItems[currentIndex].name}
                  className="slide-image"
                />
                
                <div className="slide-content">
                  <div className="slide-info">
                    <motion.div
                      className="slide-badges"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="featured-badge">Featured</span>
                      <div className="rating-badge">
                        <Star className="star-icon" />
                        <span>{featuredItems[currentIndex].rating}</span>
                      </div>
                    </motion.div>
                    
                    <motion.h3
                      className="slide-title"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {featuredItems[currentIndex].name}
                    </motion.h3>
                    
                    <motion.p
                      className="slide-description"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {featuredItems[currentIndex].description}
                    </motion.p>
                    
                    <motion.div
                      className="slide-actions"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="slide-price">
                        ${featuredItems[currentIndex].price.toFixed(2)}
                      </span>
                      
                      <motion.button
                        className="slide-btn"
                        onClick={() => addToCart(featuredItems[currentIndex], 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add to Cart
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button onClick={prevSlide} className="nav-btn nav-prev">
            <ChevronLeft size={24} />
          </button>
          
          <button onClick={nextSlide} className="nav-btn nav-next">
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="dots-container">
            {featuredItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="thumbnails-container">
          {featuredItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => setCurrentIndex(index)}
              className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
              whileHover={{ scale: index === currentIndex ? 1.1 : 1.05 }}
            >
              <img src={item.image} alt={item.name} className="thumbnail-image" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSwiper;