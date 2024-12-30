"use client";
import React, { useEffect, useRef } from "react";
import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
useGLTF.preload("/robot_playground.glb");

const Model = () => {
  const group = useRef<Group>(null);
  const { animations, scene } = useGLTF("/robot_playground.glb");
  const { actions } = useAnimations(animations, scene);
  const scroll = useScroll();
  useEffect(() => {
    // @ts-expect-error Because still now there is no support of typing in 3js
    actions["Experiment"].play().paused = true;
  }, [actions]);

  useFrame(
    () =>
      // @ts-expect-error Because still now there is no support of typing in 3js

      (actions["Experiment"].time =
        // @ts-expect-error Because still now there is no support of typing in 3js

        (actions["Experiment"].getClip().duration * scroll.offset) / 4)
  );
  return (
    <group ref={group} scale={1.5}>
      <primitive object={scene} />
    </group>
  );
};

export default Model;
