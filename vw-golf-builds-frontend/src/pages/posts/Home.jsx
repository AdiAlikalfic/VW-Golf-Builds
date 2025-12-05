import Sidebar from "../../layouts/Sidebar"
import Footer from "../../layouts/Footer"
import "./Home.css"

function Home() {
    return (
        <div className="home-page">
            <div className="posts-and-sidebar">
            <Sidebar />
            <p>Home works!</p>
            </div>
           <Footer />
        </div>
    )
}

export default Home