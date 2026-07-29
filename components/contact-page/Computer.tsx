"use client";

import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type GLTFResult = {
  nodes: {
    Cube000_ComputerDesk_0001_1: THREE.Mesh;
    Cube000_ComputerDesk_0001_2: THREE.Mesh;
    [key: string]: THREE.Mesh;
  };
  materials: {
    ["ComputerDesk.001"]: THREE.Material;
    ["FloppyDisk.001"]: THREE.Material;
    [key: string]: THREE.Material;
  };
};

export function Computer(props: React.JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/computer-optimized-transformed.glb"
  ) as unknown as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <group position={[-4.005, 67.549, 58.539]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube000_ComputerDesk_0001_1.geometry}
          material={materials["ComputerDesk.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube000_ComputerDesk_0001_2.geometry}
          material={materials["FloppyDisk.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/computer-optimized-transformed.glb");

export default React.memo(Computer);
