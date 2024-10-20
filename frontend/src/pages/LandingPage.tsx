import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div className="landing-page">
      <header className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Your Learning Platform
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Empower your education journey with our innovative tools and courses.
        </motion.p>
        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </header>

      <section className="features" ref={ref}>
        <motion.div
          className="feature-card"
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 }
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Interactive Courses</h2>
          <p>Engage with our cutting-edge learning materials.</p>
        </motion.div>
        {/* Add more feature cards here */}
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        {/* Add testimonial carousel or grid here */}
      </section>

      <footer>
        <div className="footer-links">
          {/* Add quick links here */}
        </div>
        <div className="social-icons">
          {/* Add social media icons here */}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;