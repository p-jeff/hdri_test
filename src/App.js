import * as THREE from "three";
import { OrbitControls, Box, Environment } from "@react-three/drei";
import { XR, VRButton } from "@react-three/xr";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

function KeyboardControls() {
  const { camera } = useThree();
  const speed = 0.1; // Movement speed
  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);

  // Handle keydown and keyup events for movement
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "w") setMoveForward(true);
      if (event.key === "s") setMoveBackward(true);
      if (event.key === "a") setMoveLeft(true);
      if (event.key === "d") setMoveRight(true);
    };

    const handleKeyUp = (event) => {
      if (event.key === "w") setMoveForward(false);
      if (event.key === "s") setMoveBackward(false);
      if (event.key === "a") setMoveLeft(false);
      if (event.key === "d") setMoveRight(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Update camera position based on key presses
  useFrame(() => {
    if (moveForward) camera.position.z -= speed;
    if (moveBackward) camera.position.z += speed;
    if (moveLeft) camera.position.x -= speed;
    if (moveRight) camera.position.x += speed;
  });

  return null;
}

export default function App() {
  return (
    <>
      <Suspense fallback={<p style={{ color: "white" }}>Loading...</p>}>
        <VRButton />
        <Canvas camera={{ position: [0, 2, 0] }}>
          <XR referenceSpace="local-floor">
            <KeyboardControls /> {/* Add Keyboard Controls */}
            <OrbitControls /> {/* Mouse controls when not in VR */}
            {/* HDRI from a reliable source */}
            <Environment files="alps_field_8k.hdr" background />
          </XR>
        </Canvas>
      </Suspense>
    </>
  );
}
