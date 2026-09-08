"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Environment,
  MeshDistortMaterial,
  Icosahedron,
  AdaptiveDpr,
  Sparkles,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

function CrystalCore() {
  const mesh = React.useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.rotation.x += delta * 0.04;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.9}>
      <Icosahedron ref={mesh} args={[1.35, 4]}>
        <MeshDistortMaterial
          color={"#10b981"}
          emissive={"#042f2e"}
          emissiveIntensity={0.6}
          roughness={0.12}
          metalness={0.85}
          distort={0.32}
          speed={1.6}
          envMapIntensity={1.1}
        />
      </Icosahedron>
    </Float>
  );
}

function WireShell() {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.08;
    ref.current.rotation.z += delta * 0.03;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} scale={2.35}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={"#34d399"} wireframe transparent opacity={0.18} />
      </mesh>
    </Float>
  );
}

function OrbitingNode({
  radius,
  speed,
  offset,
  size,
  color,
}: {
  radius: number;
  speed: number;
  offset: number;
  size: number;
  color: string;
}) {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 1.3) * radius * 0.35,
      Math.sin(t) * radius
    );
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.2}
        roughness={0.3}
        metalness={0.4}
      />
    </mesh>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} color={"#a7f3d0"} />
      <pointLight position={[-5, -3, -4]} intensity={2.4} color={"#10b981"} />
      <pointLight position={[5, 4, 3]} intensity={1.6} color={"#5eead4"} />

      <CrystalCore />
      <WireShell />

      <OrbitingNode radius={2.6} speed={0.6} offset={0} size={0.07} color="#34d399" />
      <OrbitingNode radius={3.1} speed={0.45} offset={2.1} size={0.05} color="#5eead4" />
      <OrbitingNode radius={2.2} speed={0.8} offset={4.0} size={0.06} color="#6ee7b7" />

      <Sparkles count={80} scale={9} size={2} speed={0.3} opacity={0.5} color="#6ee7b7" />

      <Environment preset="city" />
      <EffectComposer multisampling={4}>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.2} darkness={0.65} />
      </EffectComposer>
      <AdaptiveDpr pixelated />
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 42 }}
      style={{ width: "100%", height: "100%" }}
    >
      <SceneContent />
    </Canvas>
  );
}
