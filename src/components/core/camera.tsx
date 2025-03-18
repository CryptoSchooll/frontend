import type { FC, PropsWithChildren } from "react"
import type { OrbitControls as OCT } from "three-stdlib"

import { Html, OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

const Scene: FC<PropsWithChildren> = ({ children }) => {
  const controlsRef = useRef<OCT | null>(null)

  useFrame(() => {
    if (controlsRef.current) {
      const minX = -100,
        maxX = 100,
        minZ = -100,
        maxZ = 100
      const { target, object } = controlsRef.current

      target.x = Math.max(minX, Math.min(maxX, target.x))
      target.z = Math.max(minZ, Math.min(maxZ, target.z))

      object.position.x = Math.max(minX, Math.min(maxX, object.position.x))
      object.position.z = Math.max(minZ, Math.min(maxZ, object.position.z))

      controlsRef.current.update()
    }
  })

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableRotate={false}
        enableZoom={false}
        mouseButtons={{
          LEFT: THREE.MOUSE.PAN,
          RIGHT: THREE.MOUSE.PAN,
        }}
        touches={{
          ONE: THREE.TOUCH.PAN,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
      />
      <Html center sprite position={[0, 0, 0]}>
        {children}
      </Html>
    </>
  )
}

const Camera: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Canvas camera={{ position: [0, 200, 0], fov: 50 }}>
      <Scene>{children}</Scene>
    </Canvas>
  )
}

export default Camera
