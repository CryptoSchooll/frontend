import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
// import { init, initData } from '@telegram-apps/sdk-react'

import "./index.css"
import App from "./App.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// init()
// initData.restore()

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
