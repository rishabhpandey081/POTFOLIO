"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Environment,
  AdaptiveDpr,
  Sparkles,
  ContactShadows,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

function CrystalKnot() {
  const mesh = React.useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.15;
    mesh.current.rotation.x += delta * 0.05;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      {/* Main crystal — metallic emerald with strong emissive */}
      <mesh ref={mesh} scale={1.5}>
        <torusKnotGeometry args={[1, 0.3, 200, 32]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* Inner glowing core */}
      <mesh scale={0.8}>
        <torusKnotGeometry args={[1, 0.35, 100, 16]} />
        <meshBasicMaterial color="#6ee7b7" transparent opacity={0.3} wireframe />
      </mesh>
    </Float>
  );
}

function GlowOrb({
  position,
  color,
  size = 0.15,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.set(
      position[0] + Math.sin(t * 0.5) * 0.3,
      position[1] + Math.cos(t * 0.7) * 0.2,
      position[2] + Math.sin(t * 0.3) * 0.3
    );
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

function Rig() {
  const { camera, pointer } = useThree();
  const vec = React.useRef(new THREE.Vector3());
  useFrame(() => {
    vec.current.set(pointer.x * 1.2, pointer.y * 0.8 + 0.3, 6);
    camera.position.lerp(vec.current, 0.04);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight position={[5, 8, 5]} angle={0.3} penumbra={1} intensity={3} color="#6ee7b7" castShadow />
      <pointLight position={[-6, -2, -4]} intensity={3} color="#10b981" />
      <pointLight position={[6, 4, 3]} intensity={2} color="#5eead4" />
      <directionalLight position={[0, 5, 5]} intensity={0.5} color="#a7f3d0" />

      <CrystalKnot />

      <GlowOrb position={[2.5, 1, -1]} color="#34d399" size={0.12} />
      <GlowOrb position={[-2.8, -0.5, 0.5]} color="#5eead4" size={0.09} />
      <GlowOrb position={[1.5, -1.5, 1]} color="#6ee7b7" size={0.1} />

      <Sparkles count={120} scale={12} size={3} speed={0.4} opacity={0.6} color="#6ee7b7" />

      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.3}
        scale={10}
        blur={2.5}
        far={4}
        color="#10b981"
      />

      <Environment preset="night" />
      <Rig />
      <EffectComposer multisampling={4}>
        <Bloom
          intensity={1.1}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.8}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0008, 0.0008]}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette eskil={false} offset={0.15} darkness={0.7} />
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
      camera={{ position: [0, 0.3, 6], fov: 40 }}
      style={{ width: "100%", height: "100%" }}
    >
      <SceneContent />
    </Canvas>
  );
}
