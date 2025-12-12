import "./Navbar.css"
import Button from "../components/ui/Button"

function Navbar({setPage, isAuthenticated, setIsAuthenticated}) {

    function logout() {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
        setPage('home')
    }
    
    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => setPage("home")} style={{cursor: "pointer"}}>LOGO</div>
            <div className="navbar-actions">

            {isAuthenticated ? (
                <Button variant="primary" onClick={logout} >Logout</Button>
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