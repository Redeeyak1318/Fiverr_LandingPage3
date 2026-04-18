import React, { useState, useEffect } from 'react';

/**
 * Floating glass navigation bar with "The Floating Masthead" pattern.
 * No bottom border — glass panel with backdrop blur.
 */
function Navbar({ scrollProgress }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = scrollProgress > 0.02;

  return (
    <nav
      id="main-nav"
      className="fixed top-0 left-0 w-full z-50 transition-all duration-700"
      style={{
        background: isScrolled ? 'rgba(5, 5, 5, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(24px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          id="nav-logo"
          className="heading-editorial text-xl tracking-wide transition-colors duration-300"
          style={{ color: 'var(--bc-gold)', textDecoration: 'none' }}
        >
          BaalCare
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {['About', 'Ingredients', 'Ritual', 'Shop'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              id={`nav-${item.toLowerCase()}`}
              className="label-text transition-colors duration-300 relative group"
              style={{
                color: 'var(--bc-on-surface-variant)',
                textDecoration: 'none',
                fontSize: '0.7rem',
              }}
            >
              {item}
              {/* Active indicator dot */}
              <span
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'var(--bc-green-light)' }}
              />
            </a>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="#shop"
            id="nav-cta"
            className="hidden md:inline-flex label-text px-5 py-2.5 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, var(--bc-gold) 0%, var(--bc-gold-container) 100%)',
              color: '#3F2D0B',
              textDecoration: 'none',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
            }}
          >
            Discover
          </a>

          {/* Mobile menu toggle */}
          <button
            id="nav-menu-toggle"
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span
              className="block w-5 h-[1px] transition-all duration-300"
              style={{
                background: 'var(--bc-gold)',
                transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
              }}
            />
            <span
              className="block w-5 h-[1px] transition-all duration-300"
              style={{
                background: 'var(--bc-gold)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-[1px] transition-all duration-300"
              style={{
                background: 'var(--bc-gold)',
                transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{
          maxHeight: menuOpen ? '300px' : '0',
          background: 'rgba(5, 5, 5, 0.95)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-6">
          {['About', 'Ingredients', 'Ritual', 'Shop'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="label-text"
              style={{
                color: 'var(--bc-on-surface-variant)',
                textDecoration: 'none',
                fontSize: '0.8rem',
              }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
