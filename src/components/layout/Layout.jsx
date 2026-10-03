import { Outlet } from 'react-router'
import Footer from './Footer'
import Header from './Header'
import NavBar from './NavBar'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
