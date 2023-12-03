"use client"

import { Box } from "@mui/system"
import { Canvas, useLoader, useFrame } from "@react-three/fiber"
import mq from "theme/mediaQueries"
import { transition } from "theme/utils"
import { MeshPhysicalMaterial, Object3D, TextureLoader, Vector2, Vector3 } from "three"
import { useGLTF } from "@react-three/drei"
import { useColorScheme } from "@mui/joy"
import { useEffect, useRef, useState } from "react"
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader"
import type { BufferGeometry, Group } from "three/src/Three"

const style = {
  container: {
    pointerEvents: "none",
  },
  halo: {
    transition: transition("opacity", "width", "height"),
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "850px",
    aspectRatio: "1 / 1",

    borderRadius: "50%",
    border: "2px solid",
    borderColor: "primary.500",
    opacity: 1,

    [mq.under.laptop]: {
      width: "650px",
    },
    [mq.under.tablet]: {
      opacity: 0,
      width: "50%",
    }
  },
  canvas: {
    transition: "top ease 2s, opacity ease 2s",
    position: "absolute",

    maxWidth: "100vw",
    width: "100%",
    height: "min(1100px, 100vh)",
    left: 0,
    opacity: 0,

    top: "27%",

    [mq.under.tablet]: {
      top: "33%"
    },
  },
  visible: {
    opacity: 1,
    top: "25%",

    [mq.under.tablet]: {
      top: "30%"
    },
  }
}

interface GLB extends GLTF {
  nodes?: {
    [key: string]: {
      geometry: BufferGeometry
    }
  }
}
interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

const Sculpture = () => {
  const { mode } = useColorScheme()
  const isDark = mode === "dark"

  const { nodes }: GLB = useGLTF("/head/head.glb")
  const [
    darkColor,
    darkNormal,
    darkAlpha,
    lightColor,
    lightNormal,
    lightAlpha
  ] = useLoader(TextureLoader, [
    "head/dark-bg.png",
    "head/dark-normal.png",
    "head/dark-mask.png",
    "head/light-bg.png",
    "head/light-normal.png",
    "head/light-mask.png",
  ])

  const darkMaterial = new MeshPhysicalMaterial({
    transparent: true,
    map: darkColor,
    alphaMap: darkAlpha,
    normalMap: darkNormal,
  })

  const lightMaterial = new MeshPhysicalMaterial({
    transparent: true,
    map: lightColor,
    alphaMap: lightAlpha,
    normalMap: lightNormal,
    normalScale: new Vector2(0.25, 0.25),
  })
  const frameMaterial = new MeshPhysicalMaterial({
    color: 0xffc686,
    roughness: 0,
    metalness: 1,
    reflectivity: 1
  })
  const glassMaterial = new MeshPhysicalMaterial({
    roughness: 0,
    metalness: 0.5,
    reflectivity: 1.0,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    opacity: .1,
    transparent: true,
  })

  const position = new Vector3(0, -0.1, 0)
  const lookOriginRef = useRef(new Object3D())
  const headRef = useRef<Group>()
  const lookPosRef = useRef({
    x: 0,
    y: 0
  })

  const handleMousePos = (event: MouseEvent) => {
    const splash = document.querySelector("#splash").getBoundingClientRect()
    const x = (event.clientX / splash.width - 0.5)
    const y = -(event.clientY / splash.height - 0.5) * (splash.height / splash.width) * 2.0

    lookPosRef.current = {
      x,
      y
    }
  }
  const handleOrientation = ({ rotationRate }: DeviceMotionEvent) => {
    const x = rotationRate.beta
    const y = rotationRate.alpha

    lookPosRef.current = {
      x,
      y
    }
  }

  const permissionRef = useRef(false)
  const handlePermission = () => {
    if (
      !permissionRef.current &&
      typeof (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS).requestPermission === "function"
    ) {
      (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS).requestPermission()
        .then(permissionState => {
          if (permissionState === "granted") {
            window.addEventListener("devicemotion", handleOrientation, true)
            permissionRef.current = true
            document.querySelector("#splash").removeEventListener("click", handlePermission)
          }
        })
        .catch(error => {
          console.error(error)
          permissionRef.current = true
          document.querySelector("#splash").removeEventListener("click", handlePermission)
        })
    }
  }

  useEffect(() => {
    // pointer or mousefrom the useFrame state don't work nicely with my current DOM structure so I use mousemove instead
    window.addEventListener("mousemove", handleMousePos)
    document.querySelector("#splash").addEventListener("click", handlePermission, true)

    lookOriginRef.current.position.set(position.x, position.y, position.z)

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
      window.removeEventListener("mousemove", handleMousePos)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame(() => {
    let step = 0
    let x = 0
    let y = 0
    if (permissionRef.current === true) { // gyro motion
      const mobileMovementRange = 4.0
      x = lookPosRef.current.x * mobileMovementRange
      y = lookPosRef.current.y * mobileMovementRange
      step = 0.001
    } else { // pointer motion
      const mouseMovementRange = 0.2
      x = lookPosRef.current.x * mouseMovementRange
      y = lookPosRef.current.y * mouseMovementRange
      step = 0.001
    }


    lookOriginRef.current.lookAt(x, y + position.y, 1)
    const lookQuat = lookOriginRef.current.quaternion.clone()

    headRef.current.quaternion.slerp(lookQuat, step)
  })

  return (
    <group
      ref={headRef}
      dispose={null}
      position={position}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.head.geometry}
        material={isDark ? darkMaterial : lightMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.frame.geometry}
        material={frameMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.glass.geometry}
        material={glassMaterial}
      />
    </group>
  )
}

const Head = () => {
  const { mode } = useColorScheme()
  const isDark = mode === "dark"
  const [isReady, setReady] = useState(false)

  const handleCreated = () => {
    setReady(true)
  }

  return (
    <Box sx={style.container}>
      <Box sx={style.halo} />

      <Box
        sx={{
          ...style.canvas,
          ...(isReady ? style.visible : {})
        }}
      >
        <Canvas
          eventSource={document.body}
          style={{ pointerEvents: "none" }}
          camera={{
            fov: 30,
            near: 0.1,
            far: 20,
            position: [0, 1, 5]
          }}
          onCreated={handleCreated}
        >
          <ambientLight intensity={isDark ? 0.75 : 1.5} />
          <directionalLight
            color="white"
            intensity={isDark ? 0.75 : 1.5}
            position={[-10, 1, 1]}
          />

          <Sculpture />
        </Canvas>
      </Box>
    </Box >
  )
}

export default Head