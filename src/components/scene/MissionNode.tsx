"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import type { Mission } from "@/lib/types";

interface MissionNodeProps {
  mission: Mission;
  isSelected: boolean;
  onClick: () => void;
}

export default function MissionNode({
  mission,
  isSelected,
  onClick,
}: MissionNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const color = new THREE.Color(mission.color);
  const glowColor = new THREE.Color(mission.color);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.6;
    meshRef.current.rotation.x += delta * 0.2;

    const targetScale = isSelected ? 1.4 : hovered ? 1.2 : 1.0;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 5
    );

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (hovered ? 1.5 : 0.5);
    }
  });

  return (
    <group position={mission.position as [number, number, number]}>
      {/* Glow sphere (outer) */}
      <mesh>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={isSelected ? 0.15 : hovered ? 0.1 : 0.04}
        />
      </mesh>

      {/* Main node */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 2.5 : hovered ? 1.8 : 0.8}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Rotating ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.38, 0.018, 8, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isSelected ? 0.9 : hovered ? 0.7 : 0.3}
        />
      </mesh>

      {/* Label */}
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.13}
          color={hovered || isSelected ? mission.color : "#8d99ae"}
          anchorX="center"
          anchorY="bottom"
          font="/fonts/Rajdhani-Medium.ttf"
          maxWidth={2.5}
        >
          {mission.title.toUpperCase()}
        </Text>
        {(hovered || isSelected) && (
          <Text
            position={[0, 0.44, 0]}
            fontSize={0.09}
            color="#8d99ae"
            anchorX="center"
            anchorY="bottom"
            maxWidth={2.5}
          >
            {mission.period}
          </Text>
        )}
      </Billboard>

      {/* Point light */}
      <pointLight
        color={color}
        intensity={isSelected ? 3 : hovered ? 2 : 0.5}
        distance={3}
      />
    </group>
  );
}
