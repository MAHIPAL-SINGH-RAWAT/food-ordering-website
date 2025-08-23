import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { menuCategories, menuItems } from '../data/menuData'
import './Menu.css'

const Menu = ({ addToCart, cartItems }) => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const getItemQuantity = itemId => {
    const cartItem = cartItems.find(item => item.id === itemId)
    return cartItem ? cartItem.quantity : 0
  }

  const getAllItems = () => {
    return Object.values(menuItems).flat()
  }

  const getFilteredItems = () => {
    const items =
      activeCategory === 'all' ? getAllItems() : menuItems[activeCategory]
    return items.filter(
      item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const filteredItems = getFilteredItems()

  return (
    <section id='menu' className='menu-section'>
      <div className='container'>
        <motion.div
          className='menu-header'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className='menu-title'>Our Delicious Menu</h2>
          <p className='menu-subtitle'>
            Choose from our wide variety of fresh, delicious meals
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className='search-container'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <input
            type='text'
            placeholder='Search menu items...'
            className='search-input'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className='category-tabs'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {menuCategories.map(category => (
            <motion.button
              key={category.id}
              className={`category-tab ${
                activeCategory === category.id ? 'active' : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className='category-icon'>{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Items Grid */}
        <motion.div className='menu-grid' layout>
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className='menu-item'
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                layout
              >
                <div className='item-image-container'>
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className='item-image'
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className='image-overlay'></div>
                </div>

                <div className='item-content'>
                  <h3 className='item-name'>{item.name}</h3>
                  <p className='item-description'>{item.description}</p>

                  <div className='item-footer'>
                    <span className='item-price'>${item.price.toFixed(2)}</span>

                    {getItemQuantity(item.id) > 0 ? (
                      <motion.div
                        className='quantity-controls'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <motion.button
                          className='quantity-btn minus'
                          onClick={() => addToCart(item, -1)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus size={16} />
                        </motion.button>
                        <span className='quantity-display'>
                          {getItemQuantity(item.id)}
                        </span>
                        <motion.button
                          className='quantity-btn plus'
                          onClick={() => addToCart(item, 1)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus size={16} />
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.button
                        className='add-to-cart-btn'
                        onClick={() => addToCart(item, 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add to Cart
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.div
            className='no-results'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className='no-results-icon'>🔍</div>
            <p className='no-results-text'>
              No items found matching your search.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Menu
