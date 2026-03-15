"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ConcentricRings() {
  const groupRef = useRef<THREE.Group>(null);
  const rings = useMemo(() => {
    return [1.5, 2.2, 3.0, 3.8, 4.5].map((radius, i) => ({
      radius,
      speed: 0.08 - i * 0.012,
      opacity: 0.12 - i * 0.015,
    }));
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i * 0.3]}>
          <torusGeometry args={[ring.radius, 0.005, 16, 100]} />
          <meshBasicMaterial color="#4ECDC4" transparent opacity={ring.opacity} />
        </mesh>
      ))}
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { positions, velocities, basePositions } = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 3;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      basePositions[i * 3] = positions[i * 3];
      basePositions[i * 3 + 1] = positions[i * 3 + 1];
      basePositions[i * 3 + 2] = positions[i * 3 + 2];

      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions, velocities, basePositions };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const mouse = state.pointer;
    mouseRef.current.x += (mouse.x * 2 - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouse.y * 2 - mouseRef.current.y) * 0.05;

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < posArray.length / 3; i++) {
      posArray[i * 3] = basePositions[i * 3] + Math.sin(time * 0.3 + i) * 0.1 + mouseRef.current.x * 0.3;
      posArray[i * 3 + 1] = basePositions[i * 3 + 1] + Math.cos(time * 0.2 + i) * 0.1 + mouseRef.current.y * 0.3;
      posArray[i * 3 + 2] = basePositions[i * 3 + 2] + Math.sin(time * 0.4 + i * 0.5) * 0.05;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#4ECDC4"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function GlowOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = 2 + Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
      meshRef.current.position.y = 1.5 + Math.cos(state.clock.elapsedTime * 0.3) * 0.3;
      const scale = 1.8 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 1.5, -3]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#4ECDC4" transparent opacity={0.03} />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ConcentricRings />
        <Particles />
        <GlowOrb />
      </Canvas>
    </div>
  );
}
