import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthProvider'
import FavoritosProvider from './context/FavoritosProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FavoritosProvider>
          <App />
        </FavoritosProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
