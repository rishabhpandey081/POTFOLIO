"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

/**
 * Lightweight energy core — icosahedron + wireframe shell.
 * No postprocessing (Bloom/ChromaticAberration were causing OOM kills).
 * Rotation is driven externally via rotationRef (set by scroll).
 */

function EnergyCore() {
  const mesh = React.useRef<THREE.Mesh>(null);
  const inner = React.useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.2;
      mesh.current.rotation.x += delta * 0.08;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.35;
      inner.current.rotation.z += delta * 0.15;
      const t = state.clock.elapsedTime;
      const s = 1 + Math.sin(t * 1.5) * 0.04;
      inner.current.scale.setScalar(s);
    }
  });

  return (
    <Float speed={1.0} rotationIntensity={0.25} floatIntensity={0.6}>
      {/* Outer wireframe shell */}
      <mesh ref={mesh} scale={1.6}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#34d399"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Glowing solid core */}
      <mesh ref={inner} scale={1.15}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.7}
        />
      </mesh>

      {/* Inner bright glow */}
      <mesh scale={0.7}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#6ee7b7" transparent opacity={0.4} />
      </mesh>
    </Float>
  );
}

function Rig() {
  const { camera, pointer } = useThree();
  const vec = React.useRef(new THREE.Vector3());
  useFrame(() => {
    vec.current.set(pointer.x * 1.0, pointer.y * 0.7 + 0.3, 6);
    camera.position.lerp(vec.current, 0.04);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 4]} intensity={2} color="#34d399" />
      <pointLight position={[-5, -2, -3]} intensity={2} color="#10b981" />
      <pointLight position={[0, 5, -2]} intensity={1.2} color="#6ee7b7" />

      <EnergyCore />
      <Rig />
      {/* No postprocessing — removed Bloom/Vignette/ChromaticAberration to fix crashes */}
      <AdaptiveDpr pixelated />
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1]}
      gl={{ antialias: false, alpha: true, powerPreference: "default" }}
      camera={{ position: [0, 0.3, 6], fov: 42 }}
      style={{ width: "100%", height: "100%" }}
    >
      <SceneContent />
    </Canvas>
  );
}
