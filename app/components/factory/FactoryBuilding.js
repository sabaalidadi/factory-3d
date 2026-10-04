"use client";

export default function FactoryBuilding() {
  const columnsX = [-14, -7, 0, 7, 14];

  return (
    <group>
 
      {columnsX.map((x) => (
        <group key={`column-${x}`}>
      
          <mesh position={[x, 3.5, -9]} castShadow>
            <boxGeometry args={[0.35, 7, 0.35]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.9}
              roughness={0.25}
            />
          </mesh>

   
          <mesh position={[x, 3.5, 9]} castShadow>
            <boxGeometry args={[0.35, 7, 0.35]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.9}
              roughness={0.25}
            />
          </mesh>

   
          <mesh position={[x, 0.15, -9]}>
            <boxGeometry args={[0.9, 0.3, 0.9]} />
            <meshStandardMaterial
              color="#1e293b"
              metalness={0.85}
              roughness={0.3}
            />
          </mesh>


          <mesh position={[x, 0.15, 9]}>
            <boxGeometry args={[0.9, 0.3, 0.9]} />
            <meshStandardMaterial
              color="#1e293b"
              metalness={0.85}
              roughness={0.3}
            />
          </mesh>
        </group>
      ))}


      {columnsX.map((x) => (
        <mesh
          key={`top-beam-${x}`}
          position={[x, 7, 0]}
          castShadow
        >
          <boxGeometry args={[0.4, 0.4, 18]} />
          <meshStandardMaterial
            color="#475569"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
      ))}


      {[-9, 0, 9].map((z) => (
        <mesh
          key={`cross-beam-${z}`}
          position={[0, 6.7, z]}
          castShadow
        >
          <boxGeometry args={[30, 0.45, 0.45]} />
          <meshStandardMaterial
            color="#475569"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
      ))}


      <mesh position={[0, 5.8, 0]} castShadow>
        <boxGeometry args={[28, 0.45, 0.45]} />
        <meshStandardMaterial
          color="#dc2626"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

 
      <mesh position={[0, 5.45, 0]} castShadow>
        <boxGeometry args={[1.4, 0.55, 0.8]} />
        <meshStandardMaterial
          color="#111827"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>


      <mesh position={[0, 4.1, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 2.6, 12]} />
        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>


      <mesh
        position={[0, 2.75, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.28, 0.06, 12, 24]} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}