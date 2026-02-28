"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import MissionNode from "./MissionNode";
import type { Mission } from "@/lib/types";

// Generated once at module level — deterministic particle positions (no Math.random)
const PARTICLE_COUNT = 120;
const PARTICLE_POSITIONS = (() => {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const phi = i * 2.399963; // golden angle in radians
    const r = Math.sqrt(i / PARTICLE_COUNT);
    arr[i * 3] = r * Math.cos(phi) * 10;
    arr[i * 3 + 1] = ((i / PARTICLE_COUNT) - 0.5) * 10;
    arr[i * 3 + 2] = r * Math.sin(phi) * 10;
  }
  return arr;
})();

interface GridFloorProps {
  gridColor?: string;
}

function GridFloor({ gridColor = "#00f5d4" }: GridFloorProps) {
  const ref = useRef<THREE.GridHelper>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.position.z = (ref.current.position.z - delta * 0.3) % 1;
    }
  });
  return (
    <gridHelper
      ref={ref}
      args={[40, 40, gridColor, "#0a1a3a"]}
      position={[0, -1.2, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function RadarSweep() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4;
  });
  const geometry = new THREE.ConeGeometry(8, 0.01, 3, 1, true, 0, Math.PI / 4);
  return (
    <mesh ref={ref} position={[0, -1.19, 0]} rotation={[0, 0, 0]}>
      <primitive object={geometry} />
      <meshBasicMaterial
        color="#00f5d4"
        transparent
        opacity={0.06}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_POSITIONS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00f5d4"
        size={0.04}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

interface MissionHubSceneProps {
  missions: Mission[];
  selectedMissionId: string | null;
  onMissionClick: (mission: Mission) => void;
}

export default function MissionHubScene({
  missions,
  selectedMissionId,
  onMissionClick,
}: MissionHubSceneProps) {
  return (
    <div
      style={{ position: "absolute", inset: 0 }}
      aria-label="3D Mission Hub – use Tab to navigate missions"
      role="application"
    >
      <Canvas
        camera={{ position: [0, 3, 8], fov: 55 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#03071e"]} />

        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 10, 5]} intensity={0.5} color="#ffffff" />
        <pointLight position={[0, 5, 0]} intensity={0.3} color="#00f5d4" />

        <Suspense fallback={null}>
          <Stars
            radius={80}
            depth={60}
            count={3000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />
          <GridFloor />
          <RadarSweep />
          <ParticleField />

          {missions.map((mission) => (
            <MissionNode
              key={mission.id}
              mission={mission}
              isSelected={selectedMissionId === mission.id}
              onClick={() => onMissionClick(mission)}
            />
          ))}
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={14}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0.2}
          autoRotate
          autoRotateSpeed={0.4}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  );
}
