import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const containerRef = useRef(null);

  const features = [
    { title: "Golden Ratio Hydration", desc: "Balanced perfectly to match natural scalp oils using structural proportions.", fRatio: 5 },
    { title: "Cellular Renewal", desc: "Amino acids and active peptides restore damaged roots overnight.", fRatio: 8 },
    { title: "Fluid Dynamics", desc: "Silicone-free slip for effortless styling and natural bounce.", fRatio: 13 }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 89,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 max-w-7xl mx-auto relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="feature-card glass-panel p-8 rounded-2xl flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500 min-h-[300px]">
            <div>
              <div className="text-bcGold font-serif text-5xl mb-6 opacity-50 block leading-none">{f.fRatio}</div>
              <h3 className="text-2xl font-serif mb-4">{f.title}</h3>
              <p className="text-white/60 font-light leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
