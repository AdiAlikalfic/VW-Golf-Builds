import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './layouts/Navbar'
import Home from './pages/posts/Home'
import Auth from './pages/auth/Auth'
import { getUser } from './utils/auth'

function App() {
  const [page, setPage] = useState("home")
  const [user, setUser] = useState(getUser())
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = getUser();
    if(user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
    <Navbar 
    user={user} 
    setPage={setPage} 
    setUser={setUser} 
    isAuthenticated = {isAuthenticated}
    setIsAuthenticated = {setIsAuthenticated}
    />

    {page === "home" && <Home />}
    {page === "auth" && <Auth setPage={setPage} setIsAuthenticated={setIsAuthenticated} />}
    </>
  )
}

export default App
