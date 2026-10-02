import { Route, Routes } from 'react-router'
import Layout from './components/layout/Layout'
import Catalogo from './pages/Catalogo'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
