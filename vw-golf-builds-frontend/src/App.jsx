import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './layouts/Navbar'
import Home from './pages/posts/Home'
import Auth from './pages/auth/Auth'
import CreatePost from './pages/create-a-post/create-a-post'
import EditProfile from './pages/users/EditProfile'
import UserProfile from './pages/users/UserProfile'
import { getUser } from './utils/auth'

function App() {
  const [page, setPage] = useState("home")
  const [user, setUser] = useState(getUser())
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = getUser();
    if(user) {
      setUser(user)
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
    {page !== "createPost" && (<Navbar
    user={user} 
    setPage={setPage} 
    setUser={setUser} 
    isAuthenticated = {isAuthenticated}
    setIsAuthenticated = {setIsAuthenticated}
    />)}

    {page === "home" && <Home isAuthenticated={isAuthenticated} setPage={setPage}/>}
    {page === "auth" && <Auth setPage={setPage} setIsAuthenticated={setIsAuthenticated} />}
    {page === "createPost" && <CreatePost setPage={setPage}/>}
    {page === "editProfile" && <EditProfile setPage={setPage}/>}
    {page === "userProfile" && <UserProfile setPage={setPage}/>}
    </>
  )
}

export default App
