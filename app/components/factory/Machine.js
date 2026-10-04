"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Machine({
  position = [0, 0, 0],
  color = "#2563eb",
  machineId,
  onSelect,
  selected = false,
}) {
  const wheelRef = useRef();
  const fanRef = useRef();


  useFrame((state, delta) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.x += delta * 2;
    }

    if (fanRef.current) {
      fanRef.current.rotation.z += delta * 5;
    }
  });

const handleClick = (event) => {
  event.stopPropagation();
  onSelect?.(machineId);
};

  return (
    <group
      position={position}
      onClick={handleClick}
    >
      {/* بدنه اصلی */}
      <mesh
        position={[0, 1.5, 0]}
        castShadow
      >
        <boxGeometry args={[3.6, 2.7, 2.5]} />

        <meshStandardMaterial
          color={selected ? "#22c55e" : color}
          metalness={0.75}
          roughness={0.3}
          emissive={selected ? "#14532d" : "#000000"}
          emissiveIntensity={selected ? 0.45 : 0}
        />
      </mesh>

      {/* قسمت بالایی */}
      <mesh
        position={[0, 3.15, 0]}
        castShadow
      >
        <boxGeometry args={[2.7, 0.35, 2]} />

        <meshStandardMaterial
          color={selected ? "#16a34a" : "#1e293b"}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* پنل جلویی */}
      <mesh position={[0, 1.8, 1.29]}>
        <boxGeometry args={[2.2, 1.15, 0.08]} />

        <meshStandardMaterial
          color="#0b1220"
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* نمایشگر */}
      <mesh position={[0, 2.05, 1.34]}>
        <boxGeometry args={[1.45, 0.55, 0.03]} />

        <meshStandardMaterial
          color="#082f49"
          emissive={selected ? "#22c55e" : "#0ea5e9"}
          emissiveIntensity={selected ? 1.5 : 0.7}
        />
      </mesh>

      {/* چراغ‌ها */}
      {[0.55, 0.25, -0.05].map((x, index) => (
        <mesh
          key={index}
          position={[x, 1.42, 1.35]}
        >
          <sphereGeometry args={[0.09, 16, 16]} />

          <meshStandardMaterial
            color={
              selected
                ? "#22c55e"
                : index === 0
                ? "#22c55e"
                : index === 1
                ? "#f59e0b"
                : "#ef4444"
            }
            emissive={
              selected
                ? "#22c55e"
                : index === 0
                ? "#22c55e"
                : index === 1
                ? "#f59e0b"
                : "#ef4444"
            }
            emissiveIntensity={2}
          />
        </mesh>
      ))}

      {/* چرخ */}
      <mesh
        ref={wheelRef}
        position={[0, 0.8, 1.38]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry
          args={[0.48, 0.13, 16, 32]}
        />

        <meshStandardMaterial
          color={selected ? "#86efac" : "#94a3b8"}
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* فن */}
      <group
        ref={fanRef}
        position={[1.35, 1.2, -1.3]}
      >
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry
            args={[0.48, 0.48, 0.15, 24]}
          />

          <meshStandardMaterial
            color={selected ? "#166534" : "#111827"}
            metalness={0.8}
          />
        </mesh>

        {[0, 1, 2, 3].map((item) => (
          <mesh
            key={item}
            rotation={[
              0,
              0,
              item * (Math.PI / 2),
            ]}
            position={[0, 0, 0.15]}
          >
            <boxGeometry
              args={[0.1, 0.8, 0.08]}
            />

            <meshStandardMaterial
              color={selected ? "#86efac" : "#64748b"}
              metalness={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* پایه‌ها */}
      {[
        [-1.35, 0.25, -0.9],
        [1.35, 0.25, -0.9],
        [-1.35, 0.25, 0.9],
        [1.35, 0.25, 0.9],
      ].map((leg, index) => (
        <mesh
          key={index}
          position={leg}
          castShadow
        >
          <boxGeometry args={[0.3, 0.5, 0.3]} />

          <meshStandardMaterial
            color={selected ? "#166534" : "#334155"}
            metalness={0.8}
          />
        </mesh>
      ))}

      {/* هاله انتخاب */}
      {selected && (
        <mesh
          position={[0, 1.45, 0]}
          scale={[1.12, 1.12, 1.12]}
        >
          <boxGeometry args={[3.7, 2.8, 2.6]} />

          <meshBasicMaterial
            color="#22c55e"
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>
      )}
    </group>
  );
}