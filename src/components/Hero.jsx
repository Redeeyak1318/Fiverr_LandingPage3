import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroCanvas from './HeroCanvas.jsx';
import HeroContent from './HeroContent.jsx';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const bottleRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Create a timeline that spans the scrolling period
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Smooth scrubbing
        }
      });

      // Product transform sequence using Fibonacci steps logic
      // e.g. using golden angle/ratio for rotations and scales
      tl.to(bottleRef.current, {
        y: '21vh', // moves down slightly
        scale: 1.618, // golden ratio scale
        rotation: 15,
        ease: 'power2.inOut',
        duration: 2
      })
      .to(bottleRef.current, {
        x: '-13vw', 
        y: '34vh',
        rotation: -8,
        scale: 1,
        ease: 'power1.inOut',
        duration: 3
      })
      .to(bottleRef.current, {
        x: '8vw',
        y: '55vh',
        rotation: 21,
        scale: 0.618,
        ease: 'power3.inOut',
        duration: 5
      });
      
    }, containerRef); // Scope to container

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-bcBlack">
      {/* Sticky container that holds the viewport experience */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* HTML5 Canvas Background Layer */}
        <HeroCanvas />

        {/* Content Layer (Grid & Texts) overlay */}
        <HeroContent />

        {/* The Product - Animated by ScrollTrigger */}
        <div 
          ref={bottleRef} 
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ willChange: "transform" }}
        >
          {/* We will render a highly stylized bottle using CSS or an Image if available, but here we use a styled div to emulate it for now if image isn't given. I'll use a sophisticated HTML/CSS representation with glassmorphism for a shampoo bottle */}
          <div className="relative w-[144px] h-[377px] group cursor-pointer perspective-1000">
            {/* The bottle shadow/glow */}
            <div className="absolute inset-0 bg-bcGold/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            {/* The bottle container */}
            <div className="w-full h-full relative z-10 rounded-full bg-gradient-to-b from-[#1a1a1a] via-[#111] to-[#0a0a0a] border border-white/10 shadow-[inset_-10px_0px_20px_rgba(255,255,255,0.05)] overflow-hidden transition-transform duration-500 group-hover:rotate-x-[5deg] group-hover:rotate-y-[5deg] filter drop-shadow-2xl">
              
              {/* Bottle Cap */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-24 bg-gradient-to-r from-bcGold/80 via-yellow-200/40 to-bcGold/80 rounded-t-lg backdrop-blur-md border border-white/20"></div>
              
              {/* Bottle Body */}
              <div className="absolute top-24 bottom-4 left-4 right-4 rounded-[40px] border border-white/5 bg-gradient-to-tr from-white/5 to-transparent flex flex-col justify-end p-6 pb-12">
                <p className="font-serif text-bcGold text-3xl font-bold tracking-widest text-center">BAAL</p>
                <p className="font-sans text-[10px] text-white/50 tracking-[0.3em] text-center mt-2 uppercase">Core Essence</p>
              </div>

              {/* Liquid Level highlight */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-bcGold/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
