import "./Navbar.css"
import Button from "../components/ui/Button"
import { CgProfile } from "react-icons/cg";


function Navbar({setPage, isAuthenticated, setIsAuthenticated, setUser}) {

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        setUser(null)
        setIsAuthenticated(false)
        setPage('home')
    }
    
    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => setPage("home")} style={{cursor: "pointer"}}>LOGO</div>
            <div className="navbar-actions">

            {isAuthenticated ? (
                <><Button variant="primary" onClick={logout}>Logout</Button>
                <div className="profile-picture">
                    <CgProfile size={38} onClick={() => setPage("userProfile")}/>
                </div></>
            )
            :
            (
            <Button 
            variant="primary" 
            onClick={() => setPage("auth")}
            >
            Sign In
            </Button>
            )}
            

            
            </div>
        </nav>
    )
}

export default Navbar