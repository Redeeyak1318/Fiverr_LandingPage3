import React, { useRef, useState, useEffect } from 'react';

const testimonials = [
  {
    quote:
      'I\'ve tried every luxury hair product on the market.BaalCare is in a category of its own — my stylist asked what changed after just two weeks.',
    name: 'Sophia Reynolds',
    title: 'Creative Director',
    rating: 5,
  },
  {
    quote:
      'The scent alone is worth it — earthy, warm, grounding. But the results? My hair hasn\'t felt this alive since I was seventeen.',
    name: 'Marcus Chen',
    title: 'Architect',
    rating: 5,
  },
  {
    quote:
      'Finally, a product that delivers on its promise. Sustainably sourced, scientifically proven, and genuinely transformative.',
    name: 'Elena Vasquez',
    title: 'Dermatologist',
    rating: 5,
  },
];

function Testimonials() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44"
      style={{ background: 'var(--bc-surface-low)' }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* Section label */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <p className="label-text mb-12" style={{ color: 'var(--bc-green-light)', fontSize: '0.65rem' }}>
            Testimonials
          </p>
        </div>

        {/* Quote display */}
        <div
          className="relative min-h-[280px] flex flex-col items-center justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.7s ease',
            transitionDelay: '200ms',
          }}
        >
          {/* Large decorative quote mark */}
          <div
            className="heading-display text-8xl md:text-9xl absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 select-none pointer-events-none"
            style={{ color: 'var(--bc-gold-container)', opacity: 0.2 }}
          >
            "
          </div>

          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700"
              style={{
                opacity: activeIndex === i ? 1 : 0,
                transform: activeIndex === i ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)',
                pointerEvents: activeIndex === i ? 'auto' : 'none',
              }}
            >
              {/* Quote text */}
              <blockquote
                className="heading-editorial text-lg md:text-2xl lg:text-3xl mb-10 italic max-w-2xl"
                style={{
                  color: 'var(--bc-on-surface)',
                  lineHeight: 1.4,
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                }}
              >
                "{testimonial.quote}"
              </blockquote>

              {/* Rating stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <svg
                    key={j}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="var(--bc-gold)"
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>

              {/* Attribution */}
              <p
                className="body-text text-sm font-medium"
                style={{ color: 'var(--bc-on-surface)' }}
              >
                {testimonial.name}
              </p>
              <p
                className="label-text mt-1"
                style={{ color: 'var(--bc-on-surface-variant)', fontSize: '0.6rem' }}
              >
                {testimonial.title}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              id={`testimonial-dot-${i}`}
              onClick={() => setActiveIndex(i)}
              className="w-2 h-2 transition-all duration-400"
              style={{
                background: activeIndex === i ? 'var(--bc-gold)' : 'var(--bc-surface-highest)',
                border: 'none',
                cursor: 'pointer',
                transform: activeIndex === i ? 'scale(1.3)' : 'scale(1)',
              }}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
