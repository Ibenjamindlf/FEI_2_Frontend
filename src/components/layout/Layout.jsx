import { Outlet } from 'react-router'
import Footer from './Footer'
import Header from './Header'
import NavBar from './NavBar'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Barra superior fija de vidrio (header + navegación). Los `!` hacen que
          los bordes ganen sobre el borde completo de `vidrio-denso`. */}
      <div className="vidrio-denso sticky top-0 z-40 border-x-0! border-t-0!">
        <Header />
        <NavBar />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
