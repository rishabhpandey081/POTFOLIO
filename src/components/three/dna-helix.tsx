"use client";

import * as React from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, AdaptiveDpr, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

type ProjectImage = { url: string; title: string };

/**
 * DNA Helix — a double helix of spheres with project images as the "rungs".
 * Rotates based on scroll progress passed from the parent.
 */

function DNAStrand({
  scrollProgress,
  images,
}: {
  scrollProgress: React.MutableRefObject<number>;
  images: ProjectImage[];
}) {
  const groupRef = React.useRef<THREE.Group>(null);
  const rungRefs = React.useRef<THREE.Mesh[]>([]);

  // Build the helix points
  const POINTS = 24;
  const HELIX_HEIGHT = 8;
  const RADIUS = 1.3;
  const TURNS = 3;

  const strand1Points = React.useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < POINTS; i++) {
      const t = i / (POINTS - 1);
      const angle = t * Math.PI * 2 * TURNS;
      pts.push(
        new THREE.Vector3(
          Math.cos(angle) * RADIUS,
          (t - 0.5) * HELIX_HEIGHT,
          Math.sin(angle) * RADIUS
        )
      );
    }
    return pts;
  }, []);

  const strand2Points = React.useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < POINTS; i++) {
      const t = i / (POINTS - 1);
      const angle = t * Math.PI * 2 * TURNS + Math.PI; // offset by 180°
      pts.push(
        new THREE.Vector3(
          Math.cos(angle) * RADIUS,
          (t - 0.5) * HELIX_HEIGHT,
          Math.sin(angle) * RADIUS
        )
      );
    }
    return pts;
  }, []);

  // Project image rungs — place them at intervals along the helix
  const rungData = React.useMemo(() => {
    return images.map((img, i) => {
      const t = (i + 0.5) / images.length;
      const angle = t * Math.PI * 2 * TURNS;
      const angle2 = angle + Math.PI;
      const p1 = new THREE.Vector3(
        Math.cos(angle) * RADIUS,
        (t - 0.5) * HELIX_HEIGHT,
        Math.sin(angle) * RADIUS
      );
      const p2 = new THREE.Vector3(
        Math.cos(angle2) * RADIUS,
        (t - 0.5) * HELIX_HEIGHT,
        Math.sin(angle2) * RADIUS
      );
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const dist = p1.distanceTo(p2);
      const dir = p2.clone().sub(p1).normalize();
      const quaternion = new THREE.Quaternion();
      quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir);
      return { pos: mid, quat: quaternion, width: dist, image: img, index: i };
    });
  }, [images]);

  // Load textures
  const textures = useLoader(
    THREE.TextureLoader,
    images.map((img) => img.url)
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    // Rotate based on scroll progress + a gentle idle rotation
    const scroll = scrollProgress.current;
    groupRef.current.rotation.y = scroll * Math.PI * 4 + state.clock.elapsedTime * 0.1;
    // Slight tilt
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Strand 1 — spheres + connecting tube */}
      {strand1Points.map((p, i) => (
        <mesh key={`s1-${i}`} position={p}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#fb7185"
            emissive="#f43f5e"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>
      ))}

      {/* Strand 2 — spheres */}
      {strand2Points.map((p, i) => (
        <mesh key={`s2-${i}`} position={p}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#fda4af"
            emissive="#fb7185"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>
      ))}

      {/* Connecting lines between strands (thin rungs) */}
      {strand1Points.map((p1, i) => {
        if (i % 2 !== 0) return null;
        const p2 = strand2Points[i];
        const mid = p1.clone().add(p2).multiplyScalar(0.5);
        const dist = p1.distanceTo(p2);
        const dir = p2.clone().sub(p1).normalize();
        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir);
        return (
          <mesh key={`rung-${i}`} position={mid} quaternion={quaternion}>
            <cylinderGeometry args={[0.012, 0.012, dist, 8]} />
            <meshStandardMaterial
              color="#f43f5e"
              emissive="#f43f5e"
              emissiveIntensity={0.3}
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}

      {/* Project image planes — the "rungs" with images */}
      {rungData.map((r, i) => (
        <group key={`img-${i}`} position={r.pos} quaternion={r.quat}>
          <mesh
            ref={(el) => {
              if (el) rungRefs.current[i] = el;
            }}
          >
            <planeGeometry args={[r.width, r.width * 0.6]} />
            <meshStandardMaterial
              map={textures[i]}
              roughness={0.3}
              metalness={0.2}
              side={THREE.DoubleSide}
              transparent
              opacity={0.92}
            />
          </mesh>
          {/* Glow behind image */}
          <mesh position={[0, 0, -0.02]} scale={1.15}>
            <planeGeometry args={[r.width, r.width * 0.6]} />
            <meshBasicMaterial
              color="#fb7185"
              transparent
              opacity={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function DNAScene({
  scrollProgress,
  images,
}: {
  scrollProgress: React.MutableRefObject<number>;
  images: ProjectImage[];
}) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 2, 4]} intensity={2} color="#fb7185" />
      <pointLight position={[-3, -2, -3]} intensity={2} color="#f43f5e" />
      <pointLight position={[0, 4, 0]} intensity={1.2} color="#fda4af" />
      <directionalLight position={[0, 3, 5]} intensity={0.4} color="#fecdd3" />

      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
        <DNAStrand scrollProgress={scrollProgress} images={images} />
      </Float>

      <Environment preset="night" />
      <EffectComposer multisampling={4}>
        <Bloom
          intensity={0.9}
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

export function DNAHelix({
  scrollProgress,
  images,
}: {
  scrollProgress: React.MutableRefObject<number>;
  images: ProjectImage[];
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 7], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      <DNAScene scrollProgress={scrollProgress} images={images} />
    </Canvas>
  );
}
