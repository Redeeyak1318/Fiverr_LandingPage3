import React, { useRef, useState, useEffect } from 'react';

const ingredients = [
  {
    name: 'Cedarwood Extract',
    origin: 'Pacific Northwest',
    benefit: 'Strengthens hair follicles and promotes natural growth cycles.',
    concentration: '18%',
  },
  {
    name: 'Forest Moss Essence',
    origin: 'Ancient Temperate Forests',
    benefit: 'Deep hydration and moisture retention for 72 hours.',
    concentration: '15%',
  },
  {
    name: 'Wild Argan Oil',
    origin: 'Atlas Mountains',
    benefit: 'Restores shine and seals split ends with fatty acids.',
    concentration: '22%',
  },
  {
    name: 'Fern Root Complex',
    origin: 'Boreal Wilderness',
    benefit: 'Antioxidant protection against environmental damage.',
    concentration: '12%',
  },
  {
    name: 'Pine Resin Tincture',
    origin: 'Nordic Forests',
    benefit: 'Scalp purification and natural antibacterial properties.',
    concentration: '8%',
  },
];

function Ingredients() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ingredients"
      className="relative py-32 md:py-44"
      style={{ background: 'var(--bc-surface)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div
          className="mb-20 max-w-2xl transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <p className="label-text mb-4" style={{ color: 'var(--bc-green-light)', fontSize: '0.65rem' }}>
            The Formula
          </p>
          <h2
            className="heading-display text-3xl md:text-4xl lg:text-5xl mb-6"
            style={{ color: 'var(--bc-on-surface)' }}
          >
            Rare Botanicals,
            <br />
            <span style={{ color: 'var(--bc-gold)' }}>Precisely Balanced</span>
          </h2>
          <p className="body-text text-sm md:text-base" style={{ color: 'var(--bc-on-surface-variant)' }}>
            Each ingredient is sourced from its native habitat at peak potency,
            then extracted using our proprietary cold-process method.
          </p>
        </div>

        {/* Ingredient list */}
        <div className="space-y-0">
          {ingredients.map((ingredient, i) => (
            <div
              key={i}
              id={`ingredient-${i}`}
              className="group py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${200 + i * 100}ms`,
                background: 'transparent',
              }}
            >
              {/* Number */}
              <div className="md:col-span-1">
                <span
                  className="heading-editorial text-2xl"
                  style={{ color: 'var(--bc-gold-container)', opacity: 0.5 }}
                >
                  0{i + 1}
                </span>
              </div>

              {/* Name */}
              <div className="md:col-span-3">
                <h3
                  className="heading-editorial text-lg md:text-xl group-hover:translate-x-2 transition-transform duration-300"
                  style={{ color: 'var(--bc-on-surface)' }}
                >
                  {ingredient.name}
                </h3>
              </div>

              {/* Origin */}
              <div className="md:col-span-2">
                <span
                  className="label-text"
                  style={{ color: 'var(--bc-green-light)', fontSize: '0.6rem' }}
                >
                  {ingredient.origin}
                </span>
              </div>

              {/* Benefit */}
              <div className="md:col-span-4">
                <p className="body-text text-sm" style={{ color: 'var(--bc-on-surface-variant)' }}>
                  {ingredient.benefit}
                </p>
              </div>

              {/* Concentration */}
              <div className="md:col-span-2 text-right">
                <span
                  className="heading-editorial text-xl"
                  style={{ color: 'var(--bc-gold)' }}
                >
                  {ingredient.concentration}
                </span>
              </div>

              {/* Separator (tonal shift, not a line) */}
              <div
                className="md:col-span-12 mt-8"
                style={{
                  height: '1px',
                  background: 'linear-gradient(to right, transparent, rgba(68, 72, 63, 0.15), transparent)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Ingredients;
