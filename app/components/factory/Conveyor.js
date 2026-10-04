"use client";

export default function Conveyor({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  data = null,
  onSelect,
}) {
  return (
    <group
  position={position}
  rotation={rotation}
  onClick={(event) => {
    event.stopPropagation();

    if (onSelect) {
      onSelect({
        type: "نوار نقاله",
        objectType: "conveyor",
        data,
      });
    }
  }}
>
  
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[8, 0.35, 1.5]} />
        <meshStandardMaterial
          color="#111827"
          roughness={0.7}
        />
      </mesh>

   
      {[-3, -1.5, 0, 1.5, 3].map((x) => (
        <mesh
          key={x}
          position={[x, 1, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.45, 0.45, 1.7, 24]} />
          <meshStandardMaterial
            color="#94a3b8"
            metalness={0.8}
          />
        </mesh>
      ))}

   
      {[-3, 3].map((x) => (
        <mesh key={x} position={[x, 0.45, 0]}>
          <boxGeometry args={[0.35, 0.9, 1.2]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
      ))}
    </group>
  );
}