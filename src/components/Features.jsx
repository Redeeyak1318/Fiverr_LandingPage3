import React, { useEffect, useRef, useState } from 'react';

const features = [
  {
    id: 'natural',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 4C20 4 8 14 8 24C8 30.627 13.373 36 20 36C26.627 36 32 30.627 32 24C32 14 20 4 20 4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 36V20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 26C20 26 15 22 13 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 22C20 22 25 19 27 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: '100% Natural',
    description:
      'Every ingredient is harvested from certified organic sources. No synthetics, no compromises — only what nature intended for your hair.',
  },
  {
    id: 'sustainable',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle
          cx="20"
          cy="20"
          r="15"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 20C12 20 16 14 20 14C24 14 28 20 28 20C28 20 24 26 20 26C16 26 12 20 12 20Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 8V14M20 26V32M8 20H12M28 20H32"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: 'Sustainably Sourced',
    description:
      'Our supply chain respects ancient forests and local communities. Carbon-negative production from seed to bottle.',
  },
  {
    id: 'proven',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M16 6H24V16L28 20L24 24V34H16V24L12 20L16 16V6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 12H24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="20"
          cy="28"
          r="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: 'Clinically Proven',
    description:
      'Third-party dermatological studies confirm 94% improvement in hair strength and 87% increase in natural shine within 28 days.',
  },
];

function FeatureCard({ feature, index }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      id={`feature-${feature.id}`}
      className="group p-12 transition-all duration-500"
      style={{
        background: isVisible ? 'var(--bc-surface-low)' : 'transparent',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Icon */}
      <div
        className="mb-8 transition-colors duration-300"
        style={{ color: 'var(--bc-green-light)' }}
      >
        {feature.icon}
      </div>

      {/* Title */}
      <h3
        className="heading-editorial text-xl mb-4"
        style={{ color: 'var(--bc-on-surface)' }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p className="body-text text-sm leading-relaxed" style={{ color: 'var(--bc-on-surface-variant)' }}>
        {feature.description}
      </p>

      {/* Editorial link */}
      <a
        href="#"
        className="inline-block mt-6 label-text text-xs transition-all duration-300"
        style={{
          color: 'var(--bc-gold)',
          textDecoration: 'none',
          borderBottom: '1px solid var(--bc-gold-container)',
          paddingBottom: '4px',
        }}
      >
        Learn More
      </a>
    </div>
  );
}

function Features() {
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
      id="about"
      className="relative py-24 md:py-32"
      style={{ background: 'var(--bc-surface)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div
          className="text-center mb-20 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <p className="label-text mb-4" style={{ color: 'var(--bc-green-light)', fontSize: '0.65rem' }}>
            Why BaalCare
          </p>
          <h2
            className="heading-display text-3xl md:text-4xl lg:text-5xl"
            style={{ color: 'var(--bc-on-surface)' }}
          >
            The Difference
            <br />
            <span style={{ color: 'var(--bc-gold)' }}>is in the Details</span>
          </h2>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
