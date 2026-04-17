import React from 'react';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import CTA from './components/CTA.jsx';

function App() {
  return (
    <div className="w-full min-h-screen bg-bcBlack text-bcOffWhite selection:bg-[#c2a77a] selection:text-[#050505]">
      {/* Scroll-driven Hero Section */}
      <Hero />
      
      <main className="relative z-10 w-full bg-bcBlack">
        {/* Features / Benefits section below Hero */}
        <Features />
        
        {/* Call to Action section */}
        <CTA />
      </main>
      
      <footer className="w-full py-8 text-center text-white/50 text-sm border-t border-white/10 relative z-10 bg-bcBlack">
        <p>&copy; {new Date().getFullYear()} BaalCare. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
