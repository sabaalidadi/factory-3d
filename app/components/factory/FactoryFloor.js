"use client";

function FloorMark({ position, rotation = [0, 0, 0] }) {
  return (
    <mesh
      position={position}
      rotation={rotation}
    >
      <boxGeometry args={[5, 0.025, 0.12]} />

      <meshStandardMaterial
        color="#eab308"
        emissive="#eab308"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

export default function FactoryFloor() {
  return (
    <group>

      {/* Concrete floor */}

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 20]} />

        <meshStandardMaterial
          color="#1f2937"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* Grid */}

      <gridHelper
        args={[
          30,
          30,
          "#475569",
          "#293548",
        ]}
        position={[0, 0.015, 0]}
      />

      {/* Safety markings */}

      <FloorMark
        position={[-8, 0.03, -3]}
      />

      <FloorMark
        position={[-3, 0.03, 2.5]}
      />

      <FloorMark
        position={[3.5, 0.03, -2.5]}
      />

      <FloorMark
        position={[0, 0.03, 6]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Machine safety zones */}

      {[
        [-8, -3],
        [-3, 2.5],
        [3.5, -2.5],
      ].map(([x, z], index) => (
        <mesh
          key={index}
          position={[x, 0.025, z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry
            args={[2.1, 2.25, 32]}
          />

          <meshStandardMaterial
            color="#f59e0b"
            transparent
            opacity={0.45}
          />
        </mesh>
      ))}

    </group>
  );
}