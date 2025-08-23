import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id='about' className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div id='footer' className="footer-brand">
              <div className="footer-logo">🍕</div>
              <h3 className="brand-name">FoodieExpress</h3>
            </div>
            <p className="brand-description">
              Delivering delicious food to your doorstep since 2024. Fresh ingredients, fast delivery, and exceptional taste.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 id='contact' className="section-title">Contact Us</h4>
            <div className="contact-list">
              <div className="contact-item">
                <Phone size={16} />
                <span>(555) 123-4567</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>info@foodieexpress.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>123 Food Street, City</span>
              </div>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="section-title">Opening Hours</h4>
            <div className="hours-info">
              <div className="hours-item">
                <Clock size={16} />
                <div>
                  <p>24x7</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="section-title">Quick Links</h4>
            <div className="links-list">
              {['Menu', 'About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  className="footer-link"
                  whileHover={{ x: 5 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="copyright">
            © 2025 FoodieExpress. All rights reserved. Made with ❤️ for food lovers.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;