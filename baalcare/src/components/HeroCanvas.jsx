import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

// Background Canvas elements using requestAnimationFrame and minimal re-renders
const HeroCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    let time = 0;
    
    // Golden ratio and Fibonacci sequence references for distribution
    const PHI = 1.61803398875;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = 89; // Fibonacci number
      
      for(let i=0; i<numParticles; i++) {
        // Golden spiral distribution
        const angle = i * Math.PI * 2 * PHI;
        const radius = Math.sqrt(i) * (canvas.width > 768 ? 34 : 21); // Fibonacci radius scalar
        
        particles.push({
          x: canvas.width/2 + Math.cos(angle) * radius,
          y: canvas.height/2 + Math.sin(angle) * radius,
          baseX: canvas.width/2 + Math.cos(angle) * radius,
          baseY: canvas.height/2 + Math.sin(angle) * radius,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.05 + 0.01,
          angle: Math.random() * Math.PI * 2,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    const drawHairStrands = (t) => {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(194, 167, 122, 0.08)'; // bcGold with low opacity
      // Fibbonacci spacing lines
      const spacings = [13, 34, 55, 89, 144, 233, 377];
      
      spacings.forEach((space, i) => {
        // Left side strands
        ctx.moveTo(0, canvas.height/2);
        ctx.bezierCurveTo(
          canvas.width/4, canvas.height/2 - space * 2 + Math.sin(t*0.5 + i)*50,
          canvas.width/2, canvas.height/2 + space * 2 + Math.cos(t*0.4 + i)*50,
          canvas.width, canvas.height/2 + space
        );
      });
      ctx.stroke();
    };

    const render = () => {
      time += 0.01;
      
      // Clear with slight trailing effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)'; // bcBlack with trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawHairStrands(time);

      // Draw Particles floating with subtle parallax feel
      particles.forEach((p, i) => {
        p.angle += p.speed;
        p.y = p.baseY + Math.sin(p.angle) * 34; // Fibonacci amp
        p.x = p.baseX + Math.cos(p.angle) * 21; 
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(194, 167, 122, ${p.opacity})`;
        ctx.fill();
        
        // Glow effect for some particles based on fib sequence
        if(i % 5 === 0 || i % 8 === 0) {
          ctx.shadowBlur = 13;
          ctx.shadowColor = '#c2a77a';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
      
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    render();

    // Mouse movement subtle parallax on canvas
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 2;
      const yPos = (clientY / window.innerHeight - 0.5) * 2;
      
      gsap.to(canvas, {
        x: xPos * -21, // fibonacci movement limits
        y: yPos * -21,
        duration: 2,
        ease: 'power2.out'
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen"
    />
  );
};

export default HeroCanvas;
