import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import Bottle from './Bottle.jsx';
import ForestFloor from './ForestFloor.jsx';
import Particles from './Particles.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import FallbackScene, { CanvasFallbackContent, PureCSSFallback } from './FallbackScene.jsx';

/**
 * Quick synchronous WebGL availability check.
 * Returns true only if a WebGL context can actually be created.
 */
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Camera rig that gently moves with scroll progress
 */
function CameraRig({ scrollProgress }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 2.5, 6));
  const targetLook = useRef(new THREE.Vector3(0, 1.2, 0));

  useFrame((state, delta) => {
    // Map scroll to camera position
    const t = scrollProgress;

    // Camera moves slowly around the bottle as user scrolls
    const angle = t * Math.PI * 0.3;
    const radius = 6 - t * 1.5;
    const height = 2.5 + t * 1.5;

    targetPos.current.set(
      Math.sin(angle) * radius,
      height,
      Math.cos(angle) * radius
    );

    targetLook.current.set(0, 1.2 - t * 0.3, 0);

    // Smooth lerp
    camera.position.lerp(targetPos.current, delta * 1.5);
    
    const lookAtTarget = new THREE.Vector3();
    lookAtTarget.copy(camera.userData.lookAt || targetLook.current);
    lookAtTarget.lerp(targetLook.current, delta * 1.5);
    camera.userData.lookAt = lookAtTarget;
    camera.lookAt(lookAtTarget);
  });

  return null;
}

/**
 * Ambient light scene with warm sunlight aesthetic
 */
function Lighting() {
  return (
    <>
      {/* Warm key light (sun) */}
      <directionalLight
        position={[5, 8, 3]}
        intensity={2.5}
        color="#FFF5E0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.001}
      />

      {/* Fill light from opposite side */}
      <directionalLight
        position={[-3, 4, -2]}
        intensity={0.6}
        color="#B8CEA2"
      />

      {/* Ambient base */}
      <ambientLight intensity={0.3} color="#F4EFE8" />

      {/* Rim light for bottle separation */}
      <pointLight
        position={[-2, 3, -3]}
        intensity={1.2}
        color="#DFC394"
        distance={10}
        decay={2}
      />

      {/* Warm accent from below */}
      <pointLight
        position={[0, 0.5, 2]}
        intensity={0.5}
        color="#C2A77A"
        distance={8}
        decay={2}
      />
    </>
  );
}

/**
 * The actual 3D scene contents — wrapped in ErrorBoundary so a crash
 * inside any child (Bottle, ForestFloor, etc.) falls back gracefully.
 */
function SceneContent({ scrollProgress }) {
  return (
    <ErrorBoundary fallback={<CanvasFallbackContent />}>
      <CameraRig scrollProgress={scrollProgress} />
      <Lighting />

      {/* HDRI-like environment for reflections */}
      <Environment
        preset="forest"
        environmentIntensity={0.4}
        backgroundBlurriness={1}
        background={false}
      />

      {/* Forest Floor */}
      <ForestFloor />

      {/* Main Bottle with float animation */}
      <Float
        speed={1.5}
        rotationIntensity={0.1}
        floatIntensity={0.3}
        floatingRange={[-0.05, 0.05]}
      >
        <Bottle />
      </Float>

      {/* Floating particles (pollen/dust) */}
      <Particles />

      {/* Contact shadows on the ground */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.6}
        scale={10}
        blur={2.5}
        far={4}
        color="#1a1a0a"
      />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a05', 8, 25]} />
    </ErrorBoundary>
  );
}

/**
 * Main 3D scene canvas.
 *
 * Defence layers:
 *  0. WebGL check   — if no WebGL, skip Canvas entirely → PureCSSFallback
 *  1. Outer ErrorBoundary — if Canvas itself fails, show <FallbackScene />
 *  2. Suspense fallback  — while assets load, show a spinning wireframe sphere
 *  3. Inner ErrorBoundary — if any child component crashes, keep Canvas alive
 *  4. WebGL context-lost  — if GPU drops the context mid-session, show PureCSSFallback
 */
function Scene3D({ scrollProgress }) {
  const [webglOk, setWebglOk] = useState(() => isWebGLAvailable());
  const [contextLost, setContextLost] = useState(false);

  // If WebGL isn't available at all, show the pure CSS fallback immediately
  if (!webglOk || contextLost) {
    return <PureCSSFallback />;
  }

  return (
    <ErrorBoundary fallback={<FallbackScene />}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 2.5, 6], fov: 35, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        style={{ background: '#050505' }}
        onCreated={({ gl }) => {
          // Listen for WebGL context loss events
          const canvas = gl.domElement;
          const handleContextLost = (e) => {
            e.preventDefault();
            console.warn('[BaalCare] WebGL context lost');
            setContextLost(true);
          };
          canvas.addEventListener('webglcontextlost', handleContextLost);
        }}
      >
        <Suspense fallback={<CanvasFallbackContent />}>
          <SceneContent scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
}

export default Scene3D;
