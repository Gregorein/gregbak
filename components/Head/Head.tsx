"use client"

import { Box } from "@mui/system"
import { Canvas, useLoader, useFrame } from "@react-three/fiber"
import mq from "theme/mediaQueries"
import { transition } from "theme/utils"
import { MeshPhysicalMaterial, Object3D, TextureLoader, Vector2, Vector3 } from "three"
import { useGLTF } from "@react-three/drei"
import { useColorScheme } from "@mui/joy"
import { useEffect, useRef } from "react"
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader"
import type { BufferGeometry, Group } from "three/src/Three"

const style = {
  container: {
    pointerEvents: "none",
    overflow: "visible"
  },
  halo: {
    transition: transition("opacity", "width", "height"),
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "850px",
    height: "850px",

    borderRadius: "50%",
    border: "2px solid",
    borderColor: "primary.500",
    opacity: 1,

    [mq.under.laptop]: {
      width: "650px",
      height: "650px",
    },
    [mq.under.tablet]: {
      opacity: 0
    }
  },
  canvas: {
    position: "absolute",

    maxWidth: "100vw",
    width: "100%",
    height: "1100px",
    left: 0,
    top: 0,
    // left: "50%",
    // transform: "translate(-50%, -25%)",

    background: "rgba(255, 0, 255, 0.3)",

    [mq.under.laptop]: {
      // height: "900px",
      // width: "900px",
      // transform: "translate(-50%, -25%)",
    },
    [mq.under.tablet]: {
      // height: "800px",
      // width: "800px",
      // transform: "translate(-50%, -33%)",
    },
  }
}

// useGLTF.preload("head/head.glb")
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
    normalScale: new Vector2(1.25, 1.25),
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
    const y = rotationRate.gamma

    document.querySelector("#test").textContent = `x: ${x} y: ${y}`

    // lookPosRef.current = {
    //   x,
    //   y
    // }
  }

  useEffect(() => {
    if (typeof (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS).requestPermission === "function") {
      (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS).requestPermission()
        .then(permissionState => {
          if (permissionState === "granted") {
            window.addEventListener("deviceorientation", handleOrientation, true)
          }
        })
    }

    window.addEventListener("mousemove", handleMousePos)

    lookOriginRef.current.position.set(position.x, position.y, position.z)

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
      window.removeEventListener("mousemove", handleMousePos)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const amount = 0.2
  const step = 0.01
  useFrame(() => {
    // pointer or mousefrom the useFrame state don't work nicely with my current DOM structure
    const x = lookPosRef.current.x * amount
    const y = lookPosRef.current.y * amount + position.y

    lookOriginRef.current.lookAt(x, y, 1)
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

  return (
    <Box sx={style.container}>
      <Box sx={style.halo} />

      <Box sx={style.canvas}>
        <Canvas
          eventSource={document.body}
          style={{ pointerEvents: "none" }}
          camera={{
            fov: 30,
            near: 0.1,
            far: 10,
            position: [0, 1, 5]
          }}
          onCreated={() => { }}
        >
          <ambientLight intensity={isDark ? 0.25 : 0.9} />
          <directionalLight
            color="white"
            intensity={isDark ? 0.75 : 1.5}
            position={[-10, 10, 10]}
          />

          <Sculpture />
        </Canvas>
      </Box>
    </Box >
  )
}

export default Head