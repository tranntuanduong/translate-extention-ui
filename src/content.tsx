import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const mount = () => {
  const container = document.createElement('div')
  container.id = 'translate-extension-root'
  document.body.appendChild(container)

  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

mount() 