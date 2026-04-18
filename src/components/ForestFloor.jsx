import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural forest floor with moss, small plants, and natural-looking ground.
 * All geometry and textures are created programmatically.
 */

function GrassBlades({ count = 200, spread = 4 }) {
  const meshRef = useRef();

  const { positions, rotations, scales } = useMemo(() => {
    const pos = [];
    const rot = [];
    const scl = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.8 + Math.random() * spread;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      pos.push([x, 0, z]);
      rot.push([0, Math.random() * Math.PI, (Math.random() - 0.5) * 0.3]);
      scl.push(0.3 + Math.random() * 0.7);
    }

    return { positions: pos, rotations: rot, scales: scl };
  }, [count, spread]);

  const grassMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#3A5A2A',
      metalness: 0,
      roughness: 0.9,
      side: THREE.DoubleSide,
    });
  }, []);

  // Simple grass blade shape
  const grassGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.02, 0);
    shape.lineTo(0.015, 0.15);
    shape.lineTo(0.005, 0.25);
    shape.lineTo(-0.005, 0.15);
    shape.lineTo(-0.02, 0);
    shape.closePath();

    const geo = new THREE.ShapeGeometry(shape);
    return geo;
  }, []);

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          rotation={rotations[i]}
          scale={[scales[i], scales[i], scales[i]]}
          geometry={grassGeometry}
          material={grassMaterial}
        />
      ))}
    </group>
  );
}

function MossPatches({ count = 40 }) {
  const patches = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 3.5;
      items.push({
        position: [
          Math.cos(angle) * radius,
          0.01 + Math.random() * 0.02,
          Math.sin(angle) * radius,
        ],
        scale: 0.15 + Math.random() * 0.4,
        color: `hsl(${100 + Math.random() * 30}, ${40 + Math.random() * 25}%, ${18 + Math.random() * 15}%)`,
      });
    }
    return items;
  }, [count]);

  return (
    <group>
      {patches.map((patch, i) => (
        <mesh
          key={i}
          position={patch.position}
          rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}
          receiveShadow
        >
          <circleGeometry args={[patch.scale, 8]} />
          <meshStandardMaterial
            color={patch.color}
            metalness={0}
            roughness={1}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function SmallPlants({ count = 15 }) {
  const plants = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1 + Math.random() * 3;
      items.push({
        position: [
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius,
        ],
        scale: 0.5 + Math.random() * 1,
        leafCount: 3 + Math.floor(Math.random() * 4),
      });
    }
    return items;
  }, [count]);

  const leafMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#4A6B35',
      metalness: 0,
      roughness: 0.8,
      side: THREE.DoubleSide,
    });
  }, []);

  return (
    <group>
      {plants.map((plant, i) => (
        <group key={i} position={plant.position} scale={plant.scale}>
          {/* Stem */}
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.008, 0.012, 0.16, 6]} />
            <meshStandardMaterial color="#5A4A2A" roughness={0.9} />
          </mesh>
          {/* Leaves radiating out */}
          {Array.from({ length: plant.leafCount }).map((_, j) => {
            const leafAngle = (j / plant.leafCount) * Math.PI * 2;
            return (
              <mesh
                key={j}
                position={[
                  Math.cos(leafAngle) * 0.06,
                  0.1 + j * 0.02,
                  Math.sin(leafAngle) * 0.06,
                ]}
                rotation={[
                  -0.3 - Math.random() * 0.4,
                  leafAngle,
                  0,
                ]}
                material={leafMaterial}
              >
                <planeGeometry args={[0.06, 0.12]} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

function Pebbles({ count = 30 }) {
  const pebbles = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 4;
      items.push({
        position: [
          Math.cos(angle) * radius,
          0.02,
          Math.sin(angle) * radius,
        ],
        scale: [
          0.03 + Math.random() * 0.06,
          0.02 + Math.random() * 0.03,
          0.03 + Math.random() * 0.06,
        ],
        rotation: [0, Math.random() * Math.PI, 0],
        color: `hsl(${30 + Math.random() * 20}, ${10 + Math.random() * 15}%, ${25 + Math.random() * 20}%)`,
      });
    }
    return items;
  }, [count]);

  return (
    <group>
      {pebbles.map((pebble, i) => (
        <mesh
          key={i}
          position={pebble.position}
          rotation={pebble.rotation}
          scale={pebble.scale}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={pebble.color}
            metalness={0}
            roughness={0.95}
          />
        </mesh>
      ))}
    </group>
  );
}

function ForestFloor() {
  // Ground plane with earthy texture simulated via color
  const groundMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#2A1F15',
      metalness: 0,
      roughness: 1,
    });
  }, []);

  return (
    <group>
      {/* Main ground plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
        material={groundMaterial}
      >
        <circleGeometry args={[8, 64]} />
      </mesh>

      {/* Raised center patch (slightly different tone) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.005, 0]}
        receiveShadow
      >
        <circleGeometry args={[2, 32]} />
        <meshStandardMaterial
          color="#332816"
          metalness={0}
          roughness={1}
        />
      </mesh>

      {/* Moss patches */}
      <MossPatches count={40} />

      {/* Grass blades */}
      <GrassBlades count={180} spread={4} />

      {/* Small fern-like plants */}
      <SmallPlants count={12} />

      {/* Pebbles/rocks */}
      <Pebbles count={25} />
    </group>
  );
}

export default ForestFloor;
