import React, { useRef, useState, useEffect } from 'react';

/**
 * Call-to-Action section — editorial "Shop" prompt.
 */
function CTA() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="shop"
      className="relative py-32 md:py-44"
      style={{ background: 'var(--bc-surface)' }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div
          className="transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          {/* Decorative element */}
          <div
            className="mx-auto mb-8 w-12 h-[1px]"
            style={{ background: 'var(--bc-gold)' }}
          />

          <p className="label-text mb-6" style={{ color: 'var(--bc-green-light)', fontSize: '0.65rem' }}>
            Begin Your Transformation
          </p>

          <h2
            className="heading-display text-4xl md:text-5xl lg:text-6xl mb-8"
            style={{ color: 'var(--bc-on-surface)' }}
          >
            Elevate Your
            <br />
            <span
              className="italic"
              style={{ color: 'var(--bc-gold)', fontFamily: 'var(--font-serif)' }}
            >
              Hair Ritual
            </span>
          </h2>

          <p
            className="body-text text-base md:text-lg max-w-xl mx-auto mb-12"
            style={{ color: 'var(--bc-on-surface-variant)' }}
          >
            Experience the difference that 12 rare botanicals,
            three years of research, and centuries of forest wisdom can make.
          </p>

          {/* Price display */}
          <div className="mb-10">
            <span
              className="heading-editorial text-3xl md:text-4xl"
              style={{ color: 'var(--bc-gold)' }}
            >
              $89
            </span>
            <span
              className="body-text text-sm ml-2"
              style={{ color: 'var(--bc-on-surface-variant)' }}
            >
              / 100ml
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="cta-order"
              className="btn-gold"
            >
              <span>Order Now</span>
            </button>

            <a
              href="#ingredients"
              id="cta-learn-more"
              className="label-text px-6 py-4 transition-all duration-300"
              style={{
                color: 'var(--bc-gold)',
                textDecoration: 'none',
                fontSize: '0.75rem',
                borderBottom: '1px solid var(--bc-gold-container)',
              }}
            >
              Explore Ingredients
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-8 mt-16">
            {['Free Shipping', '30-Day Return', 'Cruelty Free'].map((badge, i) => (
              <span
                key={i}
                className="label-text"
                style={{
                  color: 'var(--bc-on-surface-variant)',
                  fontSize: '0.55rem',
                  opacity: 0.7,
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
