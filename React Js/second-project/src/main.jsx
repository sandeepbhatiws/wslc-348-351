import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Counter from './Components/Counter.jsx'
import ShowHidePassword from './Components/ShowHidePassword.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Counter /> */}

    <ShowHidePassword/>
  </StrictMode>,
)
