import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Components/Home'
import AccordianPage from './Components/AccordianPage'
import './assets/css/style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccordianPage />
  </StrictMode>,
)
