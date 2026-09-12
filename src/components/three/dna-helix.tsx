"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Float } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  rotationRef: React.MutableRefObject<number>;
};

const N = 50;
const ANGLE_STEP = 0.35;
const VERTICAL_STEP = 0.13;
const RADIUS = 1.35;

function buildStrand(phase: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < N; i++) {
    const angle = i * ANGLE_STEP + phase;
    const y = i * VERTICAL_STEP - (N * VERTICAL_STEP) / 2;
    pts.push(new THREE.Vector3(RADIUS * Math.cos(angle), y, RADIUS * Math.sin(angle)));
  }
  return pts;
}

const BLUE = "#3b82f6";

function DNAStrand({ rotationRef }: Props) {
  const groupRef = React.useRef<THREE.Group>(null);
  const strandARef = React.useRef<THREE.InstancedMesh>(null);
  const strandBRef = React.useRef<THREE.InstancedMesh>(null);
  const rungRef = React.useRef<THREE.InstancedMesh>(null);

  const strandA = React.useMemo(() => buildStrand(0), []);
  const strandB = React.useMemo(() => buildStrand(Math.PI), []);

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
    groupRef.current.rotation.y = rotationRef.current * Math.PI * 2;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={strandARef} args={[undefined, undefined, N]}>
        <sphereGeometry args={[0.075, 10, 10]} />
        <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.5} roughness={0.2} metalness={0.3} transparent opacity={0.6} />
      </instancedMesh>
      <instancedMesh ref={strandBRef} args={[undefined, undefined, N]}>
        <sphereGeometry args={[0.075, 10, 10]} />
        <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.5} roughness={0.2} metalness={0.3} transparent opacity={0.6} />
      </instancedMesh>
      <instancedMesh ref={rungRef} args={[undefined, undefined, N]}>
        <cylinderGeometry args={[0.008, 0.008, 1, 5]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.4} />
      </instancedMesh>
    </group>
  );
}

function Scene({ rotationRef }: Props) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 2, 4]} intensity={1.5} color={BLUE} />
      <pointLight position={[-3, -2, -3]} intensity={1.5} color={BLUE} />
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.25}>
        <DNAStrand rotationRef={rotationRef} />
      </Float>
      <AdaptiveDpr pixelated />
    </>
  );
}

export function DNAHelix({ rotationRef }: Props) {
  return (
    <Canvas dpr={[1, 1]} gl={{ antialias: false, alpha: true }} camera={{ position: [0, 0, 7], fov: 42 }} style={{ width: "100%", height: "100%" }}>
      <React.Suspense fallback={null}>
        <Scene rotationRef={rotationRef} />
      </React.Suspense>
    </Canvas>
  );
}
