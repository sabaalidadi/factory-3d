"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import FactoryFloor from "./FactoryFloor";
import FactoryBuilding from "./FactoryBuilding";
import Machine from "./Machine";
import Tank from "./Tank";
import Conveyor from "./Conveyor";
import Motor from "./Motor";
import FactoryInfoPanel from "./FactoryInfoPanel/FactoryInfoPanel";

import { resolveMachine, resolveFurnace, resolveMotor } from "./factoryData";

export default function FactoryScene() {
  const [selectedObject, setSelectedObject] = useState(null);

  const selectObject = (type, id) => {
    let resolved = null;
    let title = "";

    if (type === "machine") {
      resolved = resolveMachine(id);
      title = "ماشین تولید";
    }

    if (type === "furnace") {
      resolved = resolveFurnace(id);
      title = "کوره صنعتی";
    }

    if (type === "motor") {
      resolved = resolveMotor(id);
      title = "موتور صنعتی";
    }

    setSelectedObject({
      type,
      id,
      title,
      data: resolved,
    });
  };

  const clearSelection = () => {
    setSelectedObject(null);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-950">
      <Canvas
        shadows
        camera={{
          position: [24, 18, 25],
          fov: 48,
        }}
        gl={{
          antialias: true,
        }}
        onPointerMissed={clearSelection}
      >
        <color attach="background" args={["#07111c"]} />

        <ambientLight intensity={0.65} />

        <directionalLight
          position={[10, 22, 12]}
          intensity={2.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <directionalLight
          position={[-15, 12, -10]}
          intensity={1.4}
          color="#9ec5ff"
        />

        <pointLight
          position={[0, 7, 0]}
          intensity={1.5}
          distance={30}
          color="#f59e0b"
        />

        {/* کارخانه */}
        <FactoryFloor />
        <FactoryBuilding />

        <Machine
          position={[-8, 0, -3]}
          color="#2563eb"
          machineId="MAC-001"
          selected={
            selectedObject?.type === "machine" &&
            selectedObject?.id === "MAC-001"
          }
          onSelect={() => selectObject("machine", "MAC-001")}
        />

        <Machine
          position={[-3, 0, 2.5]}
          color="#7c3aed"
          machineId="MAC-002"
          selected={
            selectedObject?.type === "machine" &&
            selectedObject?.id === "MAC-002"
          }
          onSelect={() => selectObject("machine", "MAC-002")}
        />

        <Machine
          position={[3.5, 0, -2.5]}
          color="#0891b2"
          machineId="MAC-003"
          selected={
            selectedObject?.type === "machine" &&
            selectedObject?.id === "MAC-003"
          }
          onSelect={() => selectObject("machine", "MAC-003")}
        />

        <Tank
          position={[-11, 0, -5.5]}
          color="#64748b"
          furnaceId="FUR-001"
          selected={
            selectedObject?.type === "furnace" &&
            selectedObject?.id === "FUR-001"
          }
          onSelect={() => selectObject("furnace", "FUR-001")}
        />

        <Tank
          position={[-7.5, 0, -5.5]}
          color="#475569"
          furnaceId="FUR-002"
          selected={
            selectedObject?.type === "furnace" &&
            selectedObject?.id === "FUR-002"
          }
          onSelect={() => selectObject("furnace", "FUR-002")}
        />

        <Tank
          position={[10, 0, -4]}
          color="#52525e"
          furnaceId="FUR-003"
          selected={
            selectedObject?.type === "furnace" &&
            selectedObject?.id === "FUR-003"
          }
          onSelect={() => selectObject("furnace", "FUR-003")}
        />

        <Motor
          position={[-8, 1.8, -3]}
          motorId="MOT-001"
          selected={
            selectedObject?.type === "motor" && selectedObject?.id === "MOT-001"
          }
          onSelect={() => selectObject("motor", "MOT-001")}
        />

        <Motor
          position={[-3, 1.8, 2.5]}
          motorId="MOT-002"
          selected={
            selectedObject?.type === "motor" && selectedObject?.id === "MOT-002"
          }
          onSelect={() => selectObject("motor", "MOT-002")}
        />

        <Conveyor position={[-1, 0, -1]} length={8} />

        <Conveyor
          position={[5, 0, 2]}
          rotation={[0, Math.PI / 2, 0]}
          length={7}
        />

        <Conveyor
          position={[-5, 0, 5]}
          rotation={[0, Math.PI / 2, 0]}
          length={6}
        />

        <OrbitControls
          enableDamping
          dampingFactor={0.07}
          minDistance={10}
          maxDistance={48}
          maxPolarAngle={Math.PI / 2.05}
        />
      </Canvas>

      <div className="pointer-events-none absolute right-5 top-5 z-40">
        <div className="rounded-xl border border-white/10 bg-slate-950/75 px-5 py-4 text-white shadow-xl backdrop-blur-xl">
          <div className="text-xs font-medium text-cyan-400">
            DIGITAL FACTORY
          </div>

          <h1 className="mt-1 text-lg font-bold">Steel Production Plant</h1>

          <p className="mt-1 text-xs text-slate-400">
            3D Industrial Monitoring
          </p>
        </div>
      </div>

      <FactoryInfoPanel
        selectedObject={selectedObject}
        onClose={clearSelection}
      />
    </div>
  );
}
