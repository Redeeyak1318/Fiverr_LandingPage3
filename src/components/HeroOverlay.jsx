import React, { useEffect, useState } from 'react';

/**
 * Hero overlay content positioned on top of the 3D canvas.
 * Appears with staggered animations after loading.
 */
function HeroOverlay({ loaded }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => setVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  return (
    <section
      id="hero"
      className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
      style={{ height: '100vh' }}
    >
      <div className="text-center max-w-3xl px-6">
        {/* Tagline label */}
        <p
          className={`label-text mb-6 ${visible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}
          style={{ color: 'var(--bc-green-light)', fontSize: '0.7rem' }}
        >
          Premium Hair Elixir
        </p>

        {/* Main heading */}
        <h1
          className={`heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 ${
            visible ? 'animate-fade-in-up delay-300' : 'opacity-0'
          }`}
          style={{ color: 'var(--bc-on-surface)' }}
        >
          Nature's Secret
          <br />
          <span style={{ color: 'var(--bc-gold)' }}>to Perfect Hair</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`body-text text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-10 ${
            visible ? 'animate-fade-in-up delay-400' : 'opacity-0'
          }`}
          style={{ color: 'var(--bc-on-surface-variant)' }}
        >
          Crafted from rare botanicals and ancient forest essences,
          our elixir restores and transforms.
        </p>

        {/* CTA Button */}
        <div className={`${visible ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
          <a
            href="#about"
            id="hero-cta"
            className="btn-gold pointer-events-auto"
          >
            <span>Discover the Ritual</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ position: 'relative', zIndex: 1 }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${
          visible ? 'animate-fade-in delay-1000' : 'opacity-0'
        }`}
      >
        <span className="label-text" style={{ color: 'var(--bc-on-surface-variant)', fontSize: '0.6rem' }}>
          Scroll to Explore
        </span>
        <div
          className="w-[1px] h-8"
          style={{
            background: 'linear-gradient(to bottom, var(--bc-gold-deep), transparent)',
            animation: 'subtleFloat 3s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}

export default HeroOverlay;
