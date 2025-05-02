import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Components/Home'
import './assets/css/style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
