"use client"

import React, { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Html } from "@react-three/drei"
import * as THREE from "three"
import Link from "next/link"

const RobotModel: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
  const robotRef = useRef<THREE.Group>(null)
  const [modelError, setModelError] = React.useState<Error | null>(null)
  const gltf = useGLTF("/robot.glb")

  useFrame(() => {
    if (robotRef.current) {
      robotRef.current.rotation.y = THREE.MathUtils.lerp(robotRef.current.rotation.y, mousePosition.x * 0.5, 0.1)
      robotRef.current.rotation.x = THREE.MathUtils.lerp(robotRef.current.rotation.x, -mousePosition.y * 0.5, 0.1)
    }
  })

  if (modelError || !gltf) {
    console.warn("Falling back to default cube model due to loading error")
    return (
      <mesh ref={robotRef as React.RefObject<THREE.Mesh>}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="green" />
      </mesh>
    )
  }

  return (
    <group ref={robotRef}>
      <primitive object={gltf.scene} scale={[0.5, 0.5, 0.5]} position={[0, -1, 0]} />
    </group>
  )
}

function Loader() {
  return (
    <Html center>
      <div className="text-white">Loading...</div>
    </Html>
  )
}

const Header: React.FC = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event
    const { innerWidth, innerHeight } = window
    setMousePosition({
      x: (clientX / innerWidth) * 2 - 1,
      y: -(clientY / innerHeight) * 2 + 1,
    })
  }

  return (
    <header className="relative h-[50vh] min-h-[400px] w-full bg-gray-900" onMouseMove={handleMouseMove}>
      <Canvas className="absolute inset-0">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<Loader />}>
          <RobotModel mousePosition={mousePosition} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      <div className="absolute inset-0 flex flex-col justify-between p-6 text-white z-10">
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Agentia World</h1>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-green-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-400 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-400 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">Welcome to the Future</h2>
          <p className="text-xl">Explore the world of next-level AI agents</p>
        </div>
      </div>
    </header>
  )
}

export default Header

