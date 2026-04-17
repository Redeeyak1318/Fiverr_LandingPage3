import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroContent = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-content-trigger',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });

      // Simple text reveals or opacities as user scrolls.
      // E.g., Golden block fades out, CTA fades in at certain fibonacci points.
      tl.to('.text-block-1', { opacity: 0, y: -34, duration: 1 })
        .fromTo('.text-block-2', { opacity: 0, y: 55 }, { opacity: 1, y: 0, duration: 1 })
        .to('.text-block-2', { opacity: 0, y: -34, duration: 1 }, "+=0.5")
        .fromTo('.cta-block', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none flex flex-col pt-16 hero-content-trigger">
      
      {/* Hidden Fibonacci Grid Overlay (visible only via layout structures) */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-0 pointer-events-none">
        {/* We use fibonacci ratios 1, 1, 2, 3, 5 for row/cols spans if visible, but we just use absolute positioning in CSS to simulate the ratios */}
      </div>

      <div className="relative w-full h-full max-w-7xl mx-auto px-6">
        
        {/* Fibonacci 3, 5 proportioned header area */}
        <div className="text-block-1 absolute top-[13vh] left-[8vw] max-w-lg pointer-events-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-5">
            The Science of <i className="text-bcGold font-normal">Fluidity.</i>
          </h1>
          <p className="font-sans text-xl text-white/70 font-light max-w-sm tracking-wide">
            A harmonious blend of nature and advanced molecular care. Unleash your hair's true potential.
          </p>
        </div>

        {/* Text Block 2 - Appears during scroll */}
        <div className="text-block-2 absolute top-[40vh] right-[13vw] max-w-md opacity-0 pointer-events-auto text-right">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-bcGold mb-3">
            Pure Botanicals
          </h2>
          <p className="font-sans text-lg text-white/60 font-light ml-auto">
            Our patented formula penetrates the hair shaft, delivering optimal hydration derived from ancient botanical knowledge.
          </p>
        </div>

        {/* Final CTA Block at the end of scroll */}
        <div className="cta-block absolute bottom-[21vh] left-1/2 -translate-x-1/2 text-center opacity-0 pointer-events-auto flex flex-col items-center">
          <h3 className="font-serif text-3xl mb-6">Experience the transformation</h3>
          <button className="glass-panel px-10 py-4 rounded-full text-bcGold hover:text-white hover:bg-bcGold/20 transition-all duration-300 tracking-widest uppercase text-sm font-medium border-bcGold/30">
            Shop The Collection
          </button>
        </div>

      </div>
    </div>
  );
};

export default HeroContent;
