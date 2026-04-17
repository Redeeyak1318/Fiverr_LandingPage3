import React from 'react';

const CTA = () => {
  return (
    <section className="relative py-40 overflow-hidden flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bcBlack" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-3xl max-h-[768px] bg-bcGold/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto space-y-8">
        <h2 className="text-5xl md:text-7xl font-serif">Redefine Your Ritual.</h2>
        <p className="text-xl text-white/50 font-light max-w-lg mx-auto">
          Join the waitlist and unlock the power of molecularly exact, geometrically perfect hydration.
        </p>
        
        <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your essence" 
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 outline-none focus:border-bcGold/50 transition-colors placeholder:text-white/20 text-white"
          />
          <button type="button" className="bg-bcGold text-bcBlack font-medium px-8 py-4 rounded-full hover:bg-white transition-colors duration-300">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default CTA;
