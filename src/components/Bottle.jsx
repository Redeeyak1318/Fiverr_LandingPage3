import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedurally generated premium amber glass bottle with pump dispenser.
 * All geometry is created programmatically — no external assets needed.
 */
function Bottle() {
  const groupRef = useRef();
  const labelRef = useRef();

  // Slow continuous rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  // Amber glass material
  const amberGlassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#8B5E2B'),
      transmission: 0.6,
      roughness: 0.1,
      metalness: 0.05,
      thickness: 2.5,
      ior: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.5,
      attenuationColor: new THREE.Color('#6B3A1E'),
      attenuationDistance: 0.8,
      transparent: true,
      opacity: 0.92,
    });
  }, []);

  // Gold cap material
  const goldMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C2A77A'),
      metalness: 0.9,
      roughness: 0.2,
      envMapIntensity: 1.5,
    });
  }, []);

  // Pump tube material
  const silverMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4D0C8'),
      metalness: 0.8,
      roughness: 0.25,
    });
  }, []);

  // Cream label material
  const labelMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F4EFE8'),
      metalness: 0,
      roughness: 0.7,
      side: THREE.DoubleSide,
    });
  }, []);

  // Gold label accent
  const goldLabelMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#DFC394'),
      metalness: 0.6,
      roughness: 0.3,
      side: THREE.DoubleSide,
    });
  }, []);

  // Bottle body profile (lathe geometry)
  const bottleProfile = useMemo(() => {
    const points = [];
    // Bottom flat
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.55, 0));
    // Bottom curve
    points.push(new THREE.Vector2(0.58, 0.05));
    points.push(new THREE.Vector2(0.6, 0.15));
    // Main body
    points.push(new THREE.Vector2(0.6, 0.3));
    points.push(new THREE.Vector2(0.62, 0.8));
    points.push(new THREE.Vector2(0.62, 1.8));
    // Shoulder curve
    points.push(new THREE.Vector2(0.6, 2.0));
    points.push(new THREE.Vector2(0.55, 2.15));
    points.push(new THREE.Vector2(0.42, 2.3));
    points.push(new THREE.Vector2(0.3, 2.4));
    // Neck
    points.push(new THREE.Vector2(0.22, 2.5));
    points.push(new THREE.Vector2(0.2, 2.6));
    points.push(new THREE.Vector2(0.2, 2.75));
    // Lip
    points.push(new THREE.Vector2(0.22, 2.8));
    points.push(new THREE.Vector2(0.22, 2.85));
    points.push(new THREE.Vector2(0.2, 2.85));
    // Close top
    points.push(new THREE.Vector2(0, 2.85));
    return points;
  }, []);

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Main bottle body */}
      <mesh
        castShadow
        receiveShadow
        material={amberGlassMaterial}
      >
        <latheGeometry args={[bottleProfile, 64]} />
      </mesh>

      {/* Inner liquid surface */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.02, 32]} />
        <meshStandardMaterial
          color="#8B5E2B"
          transparent
          opacity={0.4}
          metalness={0.1}
          roughness={0.2}
        />
      </mesh>

      {/* Gold collar/cap base */}
      <mesh position={[0, 2.85, 0]} castShadow material={goldMaterial}>
        <cylinderGeometry args={[0.24, 0.24, 0.15, 32]} />
      </mesh>

      {/* Pump mechanism base */}
      <mesh position={[0, 3.0, 0]} castShadow material={goldMaterial}>
        <cylinderGeometry args={[0.18, 0.22, 0.15, 32]} />
      </mesh>

      {/* Pump tube */}
      <mesh position={[0, 3.35, 0]} castShadow material={silverMaterial}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
      </mesh>

      {/* Pump head */}
      <mesh position={[0, 3.65, 0]} castShadow material={goldMaterial}>
        <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
      </mesh>

      {/* Pump nozzle */}
      <group position={[0, 3.65, 0]}>
        <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow material={goldMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 0.25, 16]} />
        </mesh>
        {/* Nozzle tip */}
        <mesh position={[0.35, 0, 0]} material={goldMaterial}>
          <sphereGeometry args={[0.04, 16, 16]} />
        </mesh>
      </group>

      {/* ===== Label ===== */}
      <group ref={labelRef} position={[0, 1.2, 0]}>
        {/* Main label background (curved to match bottle) */}
        <mesh position={[0, 0, 0.63]} castShadow>
          <planeGeometry args={[0.8, 1.0]} />
          <meshStandardMaterial
            color="#F4EFE8"
            metalness={0}
            roughness={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Gold top line */}
        <mesh position={[0, 0.42, 0.635]}>
          <planeGeometry args={[0.7, 0.015]} />
          <meshStandardMaterial {...goldLabelMaterial} color="#DFC394" metalness={0.6} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>

        {/* Gold bottom line */}
        <mesh position={[0, -0.42, 0.635]}>
          <planeGeometry args={[0.7, 0.015]} />
          <meshStandardMaterial color="#DFC394" metalness={0.6} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>

        {/* Brand name - "BaalCare" as embossed text approximation */}
        <mesh position={[0, 0.15, 0.64]}>
          <planeGeometry args={[0.6, 0.12]} />
          <meshStandardMaterial
            color="#C2A77A"
            metalness={0.7}
            roughness={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Sub line decoration */}
        <mesh position={[0, 0.0, 0.64]}>
          <planeGeometry args={[0.3, 0.008]} />
          <meshStandardMaterial color="#DFC394" metalness={0.5} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>

        {/* Product name area */}
        <mesh position={[0, -0.12, 0.64]}>
          <planeGeometry args={[0.55, 0.08]} />
          <meshStandardMaterial
            color="#4A5D3A"
            metalness={0}
            roughness={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Small decorative diamond */}
        <mesh position={[0, -0.25, 0.64]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.04, 0.04]} />
          <meshStandardMaterial color="#DFC394" metalness={0.6} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

export default Bottle;
