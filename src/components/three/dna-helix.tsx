"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

type Props = {
  rotationRef: React.MutableRefObject<number>;
};

// ─── Parametric double-helix geometry ────────────────────────────────────
// Exact formula per spec:
//   angle = i * angleStep
//   y     = i * verticalStep - (N * verticalStep) / 2
//   A: x = R*cos(angle),     z = R*sin(angle)
//   B: x = R*cos(angle+π),   z = R*sin(angle+π)
const N = 80; // points per strand
const ANGLE_STEP = 0.35; // twist tightness
const VERTICAL_STEP = 0.13; // vertical spacing
const RADIUS = 1.35;

function buildStrand(phase: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < N; i++) {
    const angle = i * ANGLE_STEP + phase;
    const y = i * VERTICAL_STEP - (N * VERTICAL_STEP) / 2;
    pts.push(
      new THREE.Vector3(
        RADIUS * Math.cos(angle),
        y,
        RADIUS * Math.sin(angle)
      )
    );
  }
  return pts;
}

const BLUE = "#3b82f6";

/**
 * DNA double helix — parametric, two intertwined strands of translucent
 * glowing blue spheres, connected by straight blue "rung" lines for
 * every point. Rotation driven externally via rotationRef.
 */
function DNAStrand({ rotationRef }: Props) {
  const groupRef = React.useRef<THREE.Group>(null);
  const strandARef = React.useRef<THREE.InstancedMesh>(null);
  const strandBRef = React.useRef<THREE.InstancedMesh>(null);
  const rungRef = React.useRef<THREE.InstancedMesh>(null);

  const strandA = React.useMemo(() => buildStrand(0), []);
  const strandB = React.useMemo(() => buildStrand(Math.PI), []);

  // Rungs: connect Strand A[i] to Strand B[i] for every point
  const rungs = React.useMemo(() => {
    const out: { pos: THREE.Vector3; quat: THREE.Quaternion; len: number }[] = [];
    const up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < N; i++) {
      const a = strandA[i];
      const b = strandB[i];
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const len = a.distanceTo(b);
      const dir = b.clone().sub(a).normalize();
      const quat = new THREE.Quaternion().setFromUnitVectors(up, dir);
      out.push({ pos: mid, quat, len });
    }
    return out;
  }, [strandA, strandB]);

  // Apply instance matrices
  React.useEffect(() => {
    const dummy = new THREE.Object3D();
    if (strandARef.current) {
      strandA.forEach((p, i) => {
        dummy.position.copy(p);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        strandARef.current!.setMatrixAt(i, dummy.matrix);
      });
      strandARef.current.instanceMatrix.needsUpdate = true;
    }
    if (strandBRef.current) {
      strandB.forEach((p, i) => {
        dummy.position.copy(p);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        strandBRef.current!.setMatrixAt(i, dummy.matrix);
      });
      strandBRef.current.instanceMatrix.needsUpdate = true;
    }
    if (rungRef.current) {
      rungs.forEach((r, i) => {
        dummy.position.copy(r.pos);
        dummy.quaternion.copy(r.quat);
        dummy.scale.set(1, r.len, 1);
        dummy.updateMatrix();
        rungRef.current!.setMatrixAt(i, dummy.matrix);
      });
      rungRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [strandA, strandB, rungs]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const scroll = rotationRef.current;
    groupRef.current.rotation.y = scroll * Math.PI * 2; // full 360°
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.06;
  });

  return (
    <group ref={groupRef}>
      {/* Strand A — translucent glowing blue spheres */}
      <instancedMesh ref={strandARef} args={[undefined, undefined, N]}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshStandardMaterial
          color={BLUE}
          emissive={BLUE}
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.5}
        />
      </instancedMesh>

      {/* Strand B — translucent glowing blue spheres */}
      <instancedMesh ref={strandBRef} args={[undefined, undefined, N]}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshStandardMaterial
          color={BLUE}
          emissive={BLUE}
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.5}
        />
      </instancedMesh>

      {/* Rungs — thin blue cylinders connecting A[i] to B[i] */}
      <instancedMesh ref={rungRef} args={[undefined, undefined, N]}>
        <cylinderGeometry args={[0.008, 0.008, 1, 6]} />
        <meshBasicMaterial
          color={BLUE}
          transparent
          opacity={0.35}
        />
      </instancedMesh>
    </group>
  );
}

function Scene({ rotationRef }: Props) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 4]} intensity={2} color={BLUE} />
      <pointLight position={[-3, -2, -3]} intensity={2} color={BLUE} />
      <pointLight position={[0, 4, 0]} intensity={1.2} color="#60a5fa" />

      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.25}>
        <DNAStrand rotationRef={rotationRef} />
      </Float>

      <EffectComposer multisampling={2}>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.2}
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
