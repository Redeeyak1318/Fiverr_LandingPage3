import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

/**
 * Minimal spinning sphere shown inside the Canvas while the full scene
 * is still loading (Suspense fallback) or if the Scene3D component
 * itself crashes (SceneErrorBoundary fallback).
 *
 * Self-contained: only depends on @react-three/fiber + three (peer).
 */
function SpinningSphere() {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.6;
      meshRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 1.5, 0]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#DFC394"
        metalness={0.7}
        roughness={0.3}
        emissive="#69542E"
        emissiveIntensity={0.15}
        wireframe
      />
    </mesh>
  );
}

/**
 * A full standalone Canvas fallback — camera, lights, and a golden wireframe sphere.
 * Used when the main Scene3D cannot mount at all.
 *
 * Wrapped in its own try/catch to guarantee at least a styled div is rendered
 * even if R3F/WebGL is completely unavailable.
 */
function FallbackScene() {
  try {
    return (
      <Canvas
        camera={{ position: [0, 2, 5], fov: 40 }}
        style={{ background: '#050505', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} color="#F4EFE8" />
        <directionalLight position={[3, 5, 4]} intensity={1.8} color="#FFF5E0" />
        <pointLight position={[-2, 3, -2]} intensity={0.8} color="#DFC394" distance={10} decay={2} />
        <SpinningSphere />
        {/* Ground reference plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <circleGeometry args={[4, 32]} />
          <meshStandardMaterial color="#2A1F15" metalness={0} roughness={1} />
        </mesh>
        <fog attach="fog" args={['#0a0a05', 6, 18]} />
      </Canvas>
    );
  } catch {
    // If even the fallback Canvas fails (no WebGL), render a pure-CSS fallback
    return <PureCSSFallback />;
  }
}

/**
 * In-canvas fallback content (same geometry, no Canvas wrapper).
 * Dropped into <Suspense fallback={<CanvasFallbackContent />}>.
 */
export function CanvasFallbackContent() {
  return (
    <>
      <ambientLight intensity={0.4} color="#F4EFE8" />
      <directionalLight position={[3, 5, 4]} intensity={1.8} color="#FFF5E0" />
      <SpinningSphere />
    </>
  );
}

/**
 * Last-resort pure CSS fallback. Shown when WebGL is completely unavailable.
 * No three.js, no Canvas — just styled HTML/CSS with a CSS animation so the
 * screen is NEVER blank.
 */
export function PureCSSFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050505',
        color: '#E5E2E1',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Animated CSS "sphere" */}
      <div
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #DFC394, #69542E 60%, #2A1F15)',
          boxShadow: '0 0 60px rgba(223,195,148,0.25), inset 0 -15px 30px rgba(0,0,0,0.5)',
          animation: 'cssSphereSpin 4s linear infinite',
          marginBottom: '2rem',
        }}
      />
      <h1
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '2rem',
          color: '#DFC394',
          marginBottom: '0.5rem',
        }}
      >
        BaalCare
      </h1>
      <p style={{ color: '#c5c8bc', fontSize: '0.85rem' }}>
        Loading experience…
      </p>
      <style>{`
        @keyframes cssSphereSpin {
          0%   { transform: rotate(0deg)   scale(1);   }
          50%  { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1);   }
        }
      `}</style>
    </div>
  );
}

export default FallbackScene;
