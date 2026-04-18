import React, { useRef, useState, useEffect } from 'react';

/**
 * Story / About section with editorial asymmetric layout.
 * Uses overlapping elements and exaggerated whitespace.
 */
function Story() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ritual"
      className="relative py-32 md:py-44"
      style={{ background: 'var(--bc-surface-low)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left: Editorial text block */}
          <div
            className="transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
            }}
          >
            <p className="label-text mb-4" style={{ color: 'var(--bc-green-light)', fontSize: '0.65rem' }}>
              The Ritual
            </p>

            <h2
              className="heading-display text-3xl md:text-4xl lg:text-5xl mb-8"
              style={{ color: 'var(--bc-on-surface)' }}
            >
              An Ancient
              <br />
              <span
                className="italic"
                style={{ color: 'var(--bc-gold)', fontFamily: 'var(--font-serif)' }}
              >
                Forest Secret
              </span>
            </h2>

            <div className="space-y-6">
              <p className="body-text text-sm md:text-base" style={{ color: 'var(--bc-on-surface-variant)' }}>
                Deep in the temperate rainforests of the Pacific Northwest,
                ancient moss-covered trees guard a secret that indigenous communities
                have known for centuries — the remarkable restorative power of
                forest botanical compounds.
              </p>

              <p className="body-text text-sm md:text-base" style={{ color: 'var(--bc-on-surface-variant)' }}>
                BaalCare's master formulator spent three years studying these
                traditional practices before creating a proprietary extraction
                process that preserves every nutrient at its peak potency.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12" style={{ borderTop: '1px solid rgba(68, 72, 63, 0.15)' }}>
              {[
                { number: '12', label: 'Rare Botanicals' },
                { number: '94%', label: 'Satisfaction' },
                { number: '3yr', label: 'Research' },
              ].map((stat, i) => (
                <div key={i}>
                  <span
                    className="heading-editorial text-2xl md:text-3xl block mb-1"
                    style={{ color: 'var(--bc-gold)' }}
                  >
                    {stat.number}
                  </span>
                  <span
                    className="label-text"
                    style={{
                      color: 'var(--bc-on-surface-variant)',
                      fontSize: '0.6rem',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual element (abstract botanical illustration) */}
          <div
            className="relative transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
              transitionDelay: '200ms',
            }}
          >
            {/* Large decorative background shape */}
            <div
              className="aspect-[3/4] relative overflow-hidden"
              style={{ background: 'var(--bc-surface-container)' }}
            >
              {/* Abstract botanical pattern */}
              <svg
                viewBox="0 0 400 500"
                className="w-full h-full"
                style={{ opacity: 0.15 }}
              >
                {/* Leaf patterns */}
                <ellipse cx="200" cy="150" rx="80" ry="120" fill="none" stroke="#B8CEA2" strokeWidth="0.5" transform="rotate(-15, 200, 150)" />
                <ellipse cx="250" cy="200" rx="60" ry="100" fill="none" stroke="#B8CEA2" strokeWidth="0.5" transform="rotate(10, 250, 200)" />
                <ellipse cx="150" cy="250" rx="70" ry="110" fill="none" stroke="#4A5D3A" strokeWidth="0.5" transform="rotate(-25, 150, 250)" />

                {/* Branch lines */}
                <line x1="200" y1="100" x2="200" y2="450" stroke="#DFC394" strokeWidth="0.5" />
                <line x1="200" y1="180" x2="280" y2="140" stroke="#DFC394" strokeWidth="0.3" />
                <line x1="200" y1="250" x2="130" y2="210" stroke="#DFC394" strokeWidth="0.3" />
                <line x1="200" y1="320" x2="260" y2="300" stroke="#DFC394" strokeWidth="0.3" />

                {/* Small circles (berries) */}
                <circle cx="280" cy="140" r="4" fill="#DFC394" opacity="0.5" />
                <circle cx="130" cy="210" r="3" fill="#B8CEA2" opacity="0.5" />
                <circle cx="260" cy="300" r="5" fill="#DFC394" opacity="0.3" />
              </svg>

              {/* Overlapping gold text accent */}
              <div
                className="absolute bottom-12 right-8 heading-editorial text-6xl md:text-7xl"
                style={{
                  color: 'var(--bc-gold-container)',
                  opacity: 0.3,
                  lineHeight: 1,
                  writingMode: 'vertical-rl',
                }}
              >
                Elixir
              </div>
            </div>

            {/* Floating small card overlapping the image */}
            <div
              className="absolute -bottom-6 -left-6 p-6"
              style={{ background: 'var(--bc-surface-high)' }}
            >
              <p className="label-text mb-2" style={{ color: 'var(--bc-gold)', fontSize: '0.6rem' }}>
                Est. 2024
              </p>
              <p className="body-text text-xs" style={{ color: 'var(--bc-on-surface-variant)', maxWidth: '160px' }}>
                Hand-crafted in small batches for maximum potency and freshness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Story;
