"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, AdaptiveDpr, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

type Props = {
  rotationRef: React.MutableRefObject<number>;
};

const SPHERES_PER_STRAND = 28;
const HELIX_HEIGHT = 9;
const RADIUS = 1.35;
const TURNS = 4;

// Build strand point positions
function buildStrand(offset: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < SPHERES_PER_STRAND; i++) {
    const t = i / (SPHERES_PER_STRAND - 1);
    const angle = t * Math.PI * 2 * TURNS + offset;
    pts.push(
      new THREE.Vector3(
        Math.cos(angle) * RADIUS,
        (t - 0.5) * HELIX_HEIGHT,
        Math.sin(angle) * RADIUS
      )
    );
  }
  return pts;
}

// Palette: pink, coral, white, gold accents — cycles
const PALETTE = [
  "#34d399", // emerald
  "#10b981", // green
  "#6ee7b7", // light green
  "#5eead4", // teal
  "#a7f3d0", // pale mint
];

function colorForIndex(i: number): THREE.Color {
  return new THREE.Color(PALETTE[i % PALETTE.length]);
}

/**
 * Instanced DNA double helix — two strands of glossy spheres + thin rungs.
 * Rotation is driven externally via rotationRef (set by GSAP ScrollTrigger).
 */
function DNAStrand({ rotationRef }: Props) {
  const groupRef = React.useRef<THREE.Group>(null);
  const strand1Mesh = React.useRef<THREE.InstancedMesh>(null);
  const strand2Mesh = React.useRef<THREE.InstancedMesh>(null);
  const rungMesh = React.useRef<THREE.InstancedMesh>(null);

  const strand1 = React.useMemo(() => buildStrand(0), []);
  const strand2 = React.useMemo(() => buildStrand(Math.PI), []);

  // Build rung transforms: connect every 3rd pair of strand spheres
  const rungTransforms = React.useMemo(() => {
    const out: { pos: THREE.Vector3; quat: THREE.Quaternion; len: number; color: THREE.Color }[] = [];
    for (let i = 0; i < SPHERES_PER_STRAND; i += 4) {
      const p1 = strand1[i];
      const p2 = strand2[i];
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const len = p1.distanceTo(p2);
      const dir = p2.clone().sub(p1).normalize();
      const quat = new THREE.Quaternion();
      quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      out.push({ pos: mid, quat, len, color: colorForIndex(i) });
    }
    return out;
  }, [strand1, strand2]);

  // Set instance matrices + colors for strands
  React.useEffect(() => {
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    // Strand 1
    if (strand1Mesh.current) {
      strand1.forEach((p, i) => {
        dummy.position.copy(p);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        strand1Mesh.current!.setMatrixAt(i, dummy.matrix);
        color.copy(colorForIndex(i));
        strand1Mesh.current!.setColorAt(i, color);
      });
      strand1Mesh.current.instanceMatrix.needsUpdate = true;
      if (strand1Mesh.current.instanceColor) strand1Mesh.current.instanceColor.needsUpdate = true;
    }

    // Strand 2
    if (strand2Mesh.current) {
      strand2.forEach((p, i) => {
        dummy.position.copy(p);
        dummy.scale.setScalar(0.85);
        dummy.updateMatrix();
        strand2Mesh.current!.setMatrixAt(i, dummy.matrix);
        color.copy(colorForIndex(i + 2));
        strand2Mesh.current!.setColorAt(i, color);
      });
      strand2Mesh.current.instanceMatrix.needsUpdate = true;
      if (strand2Mesh.current.instanceColor) strand2Mesh.current.instanceColor.needsUpdate = true;
    }

    // Rungs
    if (rungMesh.current) {
      rungTransforms.forEach((r, i) => {
        dummy.position.copy(r.pos);
        dummy.quaternion.copy(r.quat);
        dummy.scale.set(1, r.len, 1);
        dummy.updateMatrix();
        rungMesh.current!.setMatrixAt(i, dummy.matrix);
        color.copy(r.color);
        rungMesh.current!.setColorAt(i, color);
      });
      rungMesh.current.instanceMatrix.needsUpdate = true;
      if (rungMesh.current.instanceColor) rungMesh.current.instanceColor.needsUpdate = true;
    }
  }, [strand1, strand2, rungTransforms]);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Drive Y rotation from the external ref (GSAP scroll progress 0→1)
    const scroll = rotationRef.current;
    groupRef.current.rotation.y = scroll * Math.PI * 2; // full 360°
    // subtle idle + tilt
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.06;
  });

  return (
    <group ref={groupRef}>
      {/* Strand 1 — instanced spheres */}
      <instancedMesh ref={strand1Mesh} args={[undefined, undefined, SPHERES_PER_STRAND]}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshStandardMaterial
          roughness={0.15}
          metalness={0.65}
          emissive="#10b981"
          emissiveIntensity={0.35}
          envMapIntensity={1.4}
        />
      </instancedMesh>

      {/* Strand 2 — instanced spheres (slightly smaller) */}
      <instancedMesh ref={strand2Mesh} args={[undefined, undefined, SPHERES_PER_STRAND]}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshStandardMaterial
          roughness={0.15}
          metalness={0.65}
          emissive="#34d399"
          emissiveIntensity={0.35}
          envMapIntensity={1.4}
        />
      </instancedMesh>

      {/* Rungs — instanced thin cylinders */}
      <instancedMesh ref={rungMesh} args={[undefined, undefined, rungTransforms.length]}>
        <cylinderGeometry args={[0.015, 0.015, 1, 8]} />
        <meshStandardMaterial
          roughness={0.3}
          metalness={0.5}
          emissive="#34d399"
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
        />
      </instancedMesh>
    </group>
  );
}

function Scene({ rotationRef }: Props) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 2, 4]} intensity={2.2} color="#34d399" />
      <pointLight position={[-3, -2, -3]} intensity={2.2} color="#10b981" />
      <pointLight position={[0, 4, 0]} intensity={1.4} color="#6ee7b7" />
      <directionalLight position={[0, 3, 5]} intensity={0.4} color="#a7f3d0" />

      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.25}>
        <DNAStrand rotationRef={rotationRef} />
      </Float>

      <Environment preset="night" />
      <EffectComposer multisampling={2}>
        <Bloom
          intensity={0.85}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.7}
        />
        <Vignette eskil={false} offset={0.2} darkness={0.6} />
      </EffectComposer>
      <AdaptiveDpr pixelated />
    </>
  );
}

export function DNAHelix({ rotationRef }: Props) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 7], fov: 42 }}
      style={{ width: "100%", height: "100%" }}
    >
      <React.Suspense fallback={null}>
        <Scene rotationRef={rotationRef} />
      </React.Suspense>
    </Canvas>
  );
}
