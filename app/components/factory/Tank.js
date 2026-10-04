"use client";

export default function Tank({
  position = [0, 0, 0],
  color = "#64748b",
  furnaceId,
  selected = false,
  onSelect,
}) {
  const handleClick = (event) => {
    event.stopPropagation();
    onSelect?.(furnaceId);
  };

  return (
    <group
      position={position}
      onClick={handleClick}
    >
      {/* بدنه کوره / مخزن */}
      <mesh
        position={[0, 2, 0]}
        castShadow
      >
        <cylinderGeometry
          args={[1.35, 1.5, 3.5, 32]}
        />

        <meshStandardMaterial
          color={selected ? "#22c55e" : color}
          metalness={0.9}
          roughness={0.25}
          emissive={
            selected ? "#14532d" : "#000000"
          }
          emissiveIntensity={
            selected ? 0.5 : 0
          }
        />
      </mesh>

      {/* قسمت بالایی */}
      <mesh
        position={[0, 3.8, 0]}
        castShadow
      >
        <sphereGeometry
          args={[1.35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
        />

        <meshStandardMaterial
          color={selected ? "#16a34a" : "#334155"}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* پایه */}
      <mesh
        position={[0, 0.25, 0]}
        castShadow
      >
        <cylinderGeometry
          args={[1.65, 1.65, 0.5, 32]}
        />

        <meshStandardMaterial
          color={selected ? "#166534" : "#1e293b"}
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* لوله بالایی */}
      <mesh
        position={[0, 4.5, 0]}
        castShadow
      >
        <cylinderGeometry
          args={[0.22, 0.22, 1.2, 20]}
        />

        <meshStandardMaterial
          color={selected ? "#22c55e" : "#64748b"}
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* خروجی جانبی */}
      <mesh
        position={[1.45, 2.1, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry
          args={[0.28, 0.28, 1, 20]}
        />

        <meshStandardMaterial
          color={selected ? "#22c55e" : "#ef4444"}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* هاله انتخاب */}
      {selected && (
        <mesh
          position={[0, 2.1, 0]}
          scale={[1.12, 1.12, 1.12]}
        >
          <cylinderGeometry
            args={[1.5, 1.55, 3.8, 32]}
          />

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