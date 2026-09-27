"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";
import { createFocusCubeMaterial } from "@/shaders/FocusCubeMaterial";
import type { BreathingPhase } from "@/lib/cube7/breathing";

type FocusCubeProps = {
  breathProgress: number;
  phase: BreathingPhase;
  isComplete: boolean;
};

export function FocusCube({ breathProgress, phase, isComplete }: FocusCubeProps) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const material = useMemo(() => createFocusCubeMaterial(), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const breathScale = 1 + breathProgress * 0.18;
    const targetScale = isComplete ? 0.72 : breathScale;

    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08,
    );

    const rotationBoost = phase === "inhale" ? 0.12 : phase === "exhale" ? 0.08 : 0.05;
    groupRef.current.rotation.x += delta * (0.26 + rotationBoost);
    groupRef.current.rotation.y += delta * (0.38 + breathProgress * 0.15);
    groupRef.current.rotation.z = Math.sin(time * 0.4) * 0.45 + breathProgress * 0.5;

    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.8) * 0.18;
      meshRef.current.rotation.y = Math.cos(time * 0.7) * 0.2;
    }

    if (material) {
      const baseGlow = phase === "hold" ? 0.95 : 0.7 + breathProgress * 0.95;
      material.emissiveIntensity = isComplete ? 0.12 : baseGlow;
      material.opacity = isComplete ? 0.1 : 0.8 + breathProgress * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} material={material} castShadow receiveShadow>
        <boxGeometry args={[2.5, 2.5, 2.5, 18, 18, 18]} />
      </mesh>
    </group>
  );
}
