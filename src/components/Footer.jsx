import React from 'react';

/**
 * Minimal editorial footer with no borders — tonal surface separation only.
 */
function Footer() {
  return (
    <footer
      id="footer"
      className="relative py-16 md:py-24"
      style={{ background: 'var(--bc-surface-lowest)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand column */}
          <div className="md:col-span-2">
            <h3
              className="heading-editorial text-2xl mb-4"
              style={{ color: 'var(--bc-gold)' }}
            >
              BaalCare
            </h3>
            <p
              className="body-text text-sm max-w-sm mb-6"
              style={{ color: 'var(--bc-on-surface-variant)' }}
            >
              Premium hair elixir crafted from rare botanicals
              and ancient forest essences. Restoring nature's
              balance, one ritual at a time.
            </p>
            <div className="flex gap-4">
              {/* Social icons */}
              {['Instagram', 'Pinterest', 'TikTok'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="label-text transition-colors duration-300"
                  style={{
                    color: 'var(--bc-on-surface-variant)',
                    textDecoration: 'none',
                    fontSize: '0.6rem',
                  }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links column */}
          <div>
            <h4
              className="label-text mb-6"
              style={{ color: 'var(--bc-gold)', fontSize: '0.65rem' }}
            >
              Explore
            </h4>
            <div className="flex flex-col gap-3">
              {['Our Story', 'Ingredients', 'Sustainability', 'Press'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="body-text text-sm transition-colors duration-300"
                  style={{
                    color: 'var(--bc-on-surface-variant)',
                    textDecoration: 'none',
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Support column */}
          <div>
            <h4
              className="label-text mb-6"
              style={{ color: 'var(--bc-gold)', fontSize: '0.65rem' }}
            >
              Support
            </h4>
            <div className="flex flex-col gap-3">
              {['Contact', 'Shipping', 'Returns', 'FAQ'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="body-text text-sm transition-colors duration-300"
                  style={{
                    color: 'var(--bc-on-surface-variant)',
                    textDecoration: 'none',
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            borderTop: '1px solid rgba(68, 72, 63, 0.1)',
          }}
        >
          <p
            className="body-text text-xs"
            style={{ color: 'var(--bc-on-surface-variant)', opacity: 0.5 }}
          >
            &copy; {new Date().getFullYear()} BaalCare. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((link) => (
              <a
                key={link}
                href="#"
                className="body-text text-xs transition-colors duration-300"
                style={{
                  color: 'var(--bc-on-surface-variant)',
                  textDecoration: 'none',
                  opacity: 0.5,
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
