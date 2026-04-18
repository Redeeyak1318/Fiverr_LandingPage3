import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Floating pollen/dust particles that drift through the scene.
 * Creates a magical forest atmosphere.
 */
function Particles({ count = 80 }) {
  const meshRef = useRef();
  const timeRef = useRef(0);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          Math.random() * 6,
          (Math.random() - 0.5) * 10
        ),
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        scale: 0.01 + Math.random() * 0.025,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    timeRef.current += delta;

    particles.forEach((particle, i) => {
      const t = timeRef.current * particle.speed;

      // Gentle drifting motion
      dummy.position.set(
        particle.position.x + Math.sin(t + particle.offset) * 0.5,
        particle.position.y + Math.sin(t * 0.7 + particle.offset) * 0.3,
        particle.position.z + Math.cos(t * 0.5 + particle.offset) * 0.5
      );

      // Wrap around
      if (dummy.position.y > 6) dummy.position.y = 0;
      if (dummy.position.y < 0) dummy.position.y = 6;

      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#FFF5E0"
        emissive="#DFC394"
        emissiveIntensity={0.3}
        transparent
        opacity={0.5}
      />
    </instancedMesh>
  );
}

export default Particles;
