"use client";

import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Computer from "./Computer";

const ContactExperience: React.FC = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 3, 7], fov: 45 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      className="w-full h-full"
    >
      <ambientLight intensity={0.7} color="#ffffff" />

      <directionalLight position={[5, 5, 3]} intensity={2.5} color="#ffffff" />

      <directionalLight
        position={[5, 9, 1]}
        castShadow
        intensity={2.0}
        color="#e6e6e6"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <group scale={[1, 1, 1]}>
        <mesh
          receiveShadow
          position={[0, -1.5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial
            color="#171717"
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
      </group>

      <Suspense fallback={null}>
        <group scale={0.03} position={[0, -1.49, -2]} castShadow>
          <Computer />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default React.memo(ContactExperience);
