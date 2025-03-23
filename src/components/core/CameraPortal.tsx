import type { PropsWithChildren } from "react"

import ReactDOM from "react-dom"

const CameraPortal: React.FC<PropsWithChildren> = ({ children }) => {
  let portalRoot = document.getElementById("portal-root")
  if (!portalRoot) {
    portalRoot = document.createElement("div")
    portalRoot.id = "portal-root"
    document.body.appendChild(portalRoot)
  }

  return ReactDOM.createPortal(
    <div className="pointer-events-auto absolute inset-0 z-0">{children}</div>,
    portalRoot,
  )
}

export default CameraPortal
