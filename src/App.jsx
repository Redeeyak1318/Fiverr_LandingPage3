import React, { useState, useEffect, useRef } from 'react';
import Scene3D from './components/Scene3D.jsx';
import Navbar from './components/Navbar.jsx';
import HeroOverlay from './components/HeroOverlay.jsx';
import Features from './components/Features.jsx';
import Story from './components/Story.jsx';
import Ingredients from './components/Ingredients.jsx';
import Testimonials from './components/Testimonials.jsx';
import CTA from './components/CTA.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    // Simulate loading sequence
    const timer = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen" style={{ background: 'var(--bc-black)', color: 'var(--bc-on-surface)' }}>
      {/* Loading Screen */}
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{
          background: 'var(--bc-black)',
          opacity: loaded ? 0 : 1,
          pointerEvents: loaded ? 'none' : 'all',
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="text-center">
          <h1
            className="heading-editorial text-3xl mb-2"
            style={{ color: 'var(--bc-gold)' }}
          >
            BaalCare
          </h1>
          <p className="label-text" style={{ color: 'var(--bc-on-surface-variant)' }}>
            Loading Experience
          </p>
          <div
            className="mt-6 mx-auto h-[1px] animate-shimmer"
            style={{
              width: '120px',
              background: `linear-gradient(90deg, transparent, var(--bc-gold), transparent)`,
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s linear infinite',
            }}
          />
        </div>
      </div>

      {/* Fixed 3D Canvas */}
      <div className="canvas-container">
        <Scene3D scrollProgress={scrollProgress} />
      </div>

      {/* Navigation */}
      <Navbar scrollProgress={scrollProgress} />

      {/* Hero Overlay (on top of 3D scene) */}
      <HeroOverlay loaded={loaded} />

      {/* Scrollable Content */}
      <div ref={contentRef} className="relative z-10">
        {/* Spacer for hero section */}
        <div style={{ height: '100vh' }} />

        {/* Content sections */}
        <div style={{ background: 'var(--bc-black)' }}>
          <Features />
          <Story />
          <Ingredients />
          <Testimonials />
          <CTA />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
