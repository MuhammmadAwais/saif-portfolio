"use client";

import React, { Suspense, useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import Computer from "./Computer";

const WebGLCleaner: React.FC = () => {
  const { gl, scene } = useThree();
  useEffect(() => {
    return () => {
      scene.traverse((object: any) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat: any) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      gl.dispose();
    };
  }, [gl, scene]);
  return null;
};

const ContactExperience: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);

  useEffect(() => {
    const checkMobileAndNetwork = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Detect slow internet / Data Saver on mobile to avoid heavy 3D load
      if (mobile && "connection" in navigator) {
        const conn = (navigator as any).connection;
        if (conn) {
          const slowType = ["slow-2g", "2g", "3g"].includes(conn.effectiveType);
          const isSaveData = conn.saveData === true;
          if (slowType || isSaveData) {
            setIsSlowNetwork(true);
          }
        }
      }
    };

    checkMobileAndNetwork();
    window.addEventListener("resize", checkMobileAndNetwork);
    return () => window.removeEventListener("resize", checkMobileAndNetwork);
  }, []);

  // Conditional Lite Mode fallback for slow mobile internet connections
  if (isSlowNetwork && isMobile) {
    return (
      <div className="w-full h-full min-h-[260px] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-neutral-900 via-black to-neutral-950 text-white text-center rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />
        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 shadow-xl backdrop-blur-md">
          <span className="text-xl">⚡</span>
        </div>
        <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
          Fast-Load Lite Mode
        </h3>
        <p className="font-sans text-xs sm:text-sm text-neutral-300 max-w-xs mb-4">
          Optimized for your connection speed. Ready to craft exceptional visual experiences together.
        </p>
        <button
          onClick={() => setIsSlowNetwork(false)}
          type="button"
          className="px-5 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300"
        >
          Load 3D Desk Anyway
        </button>
      </div>
    );
  }

  return (
    <Canvas
      shadows
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{
        position: isMobile ? [0, 2.8, 8.2] : [0, 3, 7],
        fov: isMobile ? 42 : 45,
      }}
      gl={{ antialias: true, powerPreference: isMobile ? "default" : "high-performance" }}
      className="w-full h-full"
    >
      <WebGLCleaner />
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
        target={isMobile ? [0, 0.2, 0] : [0, 0, 0]}
      />

      <group scale={[1, 1, 1]}>
        <mesh
          receiveShadow
          position={isMobile ? [0, -1.4, 0] : [0, -1.5, 0]}
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
        <group
          scale={isMobile ? 0.027 : 0.03}
          position={isMobile ? [0, -1.4, -1.0] : [0, -1.49, -2]}
          castShadow
        >
          <Computer />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default React.memo(ContactExperience);
