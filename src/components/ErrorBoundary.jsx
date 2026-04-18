import React from 'react';

/**
 * Global error boundary — catches render crashes anywhere in the tree
 * and shows the FallbackScene so the screen is NEVER blank.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[BaalCare] Render crash caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultFallbackUI error={this.state.error} />;
    }
    return this.props.children;
  }
}

/**
 * Default fallback UI shown when the entire app crashes.
 * Renders a simple styled message — no 3D dependencies needed.
 */
function DefaultFallbackUI({ error }) {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050505',
        color: '#E5E2E1',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Animated golden orb so the screen is never blank */}
      <div
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #DFC394, #69542E 60%, #2A1F15)',
          boxShadow: '0 0 60px rgba(223,195,148,0.25), inset 0 -15px 30px rgba(0,0,0,0.5)',
          animation: 'fallbackOrb 4s ease-in-out infinite',
          marginBottom: '2rem',
        }}
      />
      <h1
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '2.5rem',
          color: '#DFC394',
          marginBottom: '1rem',
        }}
      >
        BaalCare
      </h1>
      <p style={{ color: '#c5c8bc', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Something went wrong loading the experience.
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: '0.8rem 2rem',
          background: 'linear-gradient(135deg, #DFC394 0%, #69542E 100%)',
          color: '#3F2D0B',
          border: 'none',
          fontWeight: 500,
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          cursor: 'pointer',
          borderRadius: '2px',
        }}
      >
        Reload Page
      </button>
      {process.env.NODE_ENV === 'development' && error && (
        <pre
          style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#1c1b1b',
            color: '#c5c8bc',
            fontSize: '0.7rem',
            maxWidth: '600px',
            overflow: 'auto',
            borderRadius: '4px',
          }}
        >
          {error.toString()}
        </pre>
      )}
      <style>{`
        @keyframes fallbackOrb {
          0%   { transform: scale(1)   translateY(0);    }
          50%  { transform: scale(1.08) translateY(-8px); }
          100% { transform: scale(1)   translateY(0);    }
        }
      `}</style>
    </div>
  );
}

export default ErrorBoundary;
