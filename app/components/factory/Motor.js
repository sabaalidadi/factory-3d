"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Motor({
  position = [0, 0, 0],
  motorId,
  selected = false,
  onSelect,
}) {
  const rotorRef = useRef();

  useFrame((state, delta) => {
    if (rotorRef.current) {
      rotorRef.current.rotation.x += delta * 5;
    }
  });

  const handleClick = (event) => {
    event.stopPropagation();
    onSelect?.(motorId);
  };

  return (
    <group
      position={position}
      onClick={handleClick}
    >
      {/* بدنه موتور */}
      <mesh castShadow>
        <cylinderGeometry
          args={[0.7, 0.7, 1.6, 32]}
        />

        <meshStandardMaterial
          color={selected ? "#22c55e" : "#475569"}
          metalness={0.95}
          roughness={0.2}
          emissive={
            selected ? "#14532d" : "#000000"
          }
          emissiveIntensity={
            selected ? 0.5 : 0
          }
        />
      </mesh>

      {/* روتور */}
      <group
        ref={rotorRef}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <mesh position={[0, 0.85, 0]}>
          <cylinderGeometry
            args={[0.35, 0.35, 0.2, 24]}
          />

          <meshStandardMaterial
            color={
              selected
                ? "#86efac"
                : "#94a3b8"
            }
            metalness={1}
            roughness={0.15}
          />
        </mesh>

        <mesh
          position={[0, 0.95, 0]}
        >
          <torusGeometry
            args={[0.45, 0.08, 16, 32]}
          />

          <meshStandardMaterial
            color={
              selected
                ? "#4ade80"
                : "#64748b"
            }
            metalness={1}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* پایه موتور */}
      <mesh
        position={[0, -0.9, 0]}
        castShadow
      >
        <boxGeometry
          args={[1.5, 0.25, 1]}
        />

        <meshStandardMaterial
          color={
            selected
              ? "#166534"
              : "#1e293b"
          }
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* هاله انتخاب */}
      {selected && (
        <mesh>
          <cylinderGeometry
            args={[0.85, 0.85, 1.9, 32]
          }
          />

          <meshBasicMaterial
            color="#22c55e"
            wireframe
            transparent
            opacity={0.9}
          />
        </mesh>
      )}
    </group>
  );
}