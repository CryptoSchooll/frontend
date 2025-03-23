import { useState } from "react"

import Camera from "../components/core/Camera"
import CameraPortal from "../components/core/CameraPortal"

const Home = () => {
  const [count, setCount] = useState(0)
  return (
    <div className="relative h-full">
      <CameraPortal>
        <Camera>
          <div
            className="flex h-[300px] w-[400px] flex-col items-center justify-center bg-green-500 bg-opacity-50"
            style={{ transform: "scale(1)" }}
          >
            <h2 className="text-xl font-bold">Core gameplay</h2>
            <p>{count}</p>
            <button onClick={() => setCount((prev) => prev + 1)}>click</button>
          </div>
        </Camera>
      </CameraPortal>
    </div>
  )
}

export default Home
