"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { useProgress, Html, ScrollControls } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white font-sans">
        <div className="w-72 h-2 bg-gray-700 rounded-md overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-md transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-lg font-bold">{progress.toFixed(1)}% loaded</div>
      </div>
    </Html>
  );
};

const Scene = () => {
  return (
    <Canvas
      gl={{ antialias: true }}
      dpr={[1, 1.5]}
      className="relative size-full scrollbar-hidden"
    >
      <directionalLight position={[-5, -5, -5]} intensity={4} />
      <Suspense fallback={<Loader />}>
        <ScrollControls damping={0.5} pages={3}>
          <Model />
        </ScrollControls>
      </Suspense>
    </Canvas>
  );
};

export default Scene;
