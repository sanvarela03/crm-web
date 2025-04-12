import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ModalLib from './components/ModalLib/Modal.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <main className="text-foreground bg-background">
        <App />
      </main>
    </BrowserRouter>
  </StrictMode>
)
