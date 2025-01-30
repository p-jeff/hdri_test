import * as THREE from "three";
import { OrbitControls, Box, Environment } from "@react-three/drei";
import { XR, VRButton } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export default function App() {
  return (
    <>
      <Suspense fallback={<p style={{ color: "white" }}>Loading...</p>}>
        <VRButton />
        <Canvas camera={{ position: [0, 2, 0] }}>
          <XR referenceSpace="local-floor">
            <color attach="background" args={["#111"]} />
            <ambientLight intensity={2} />
            <pointLight position={[20, 10, -10]} intensity={2} />
            <primitive object={new THREE.AxesHelper(2)} />
            <primitive object={new THREE.GridHelper(20, 20)} />
            <OrbitControls />

            {/* HDRI from a reliable source */}
            <Environment
              files="https://github.com/p-jeff/nhm_tests/raw/refs/heads/master/alps_field_4k%20(1).hdr"
              background
              blur={0.2}
            />

            <Box key="companionCube">
              <meshPhongMaterial attach="material" color="#440066" />
            </Box>
          </XR>
        </Canvas>
      </Suspense>
    </>
  );
}
