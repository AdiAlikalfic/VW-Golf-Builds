import Sidebar from "../../layouts/Sidebar"
import Footer from "../../layouts/Footer"
import PostCard from "../../components/posts/PostCard"
import Button from "../../components/ui/Button"
import "./Home.css"

function Home({isAuthenticated, setPage}) {
    return (
        <div className="home-page">
            
            <div className="posts-and-sidebar">
            <Sidebar />
            <div className="posts">
            <div className="header">
                <h2>VW Golf Custom Builds</h2>
                <p>Discover and share amazing Volkswagen Golf builds from the community</p>
             </div>
             <div className="post-button">
               {isAuthenticated && (<Button variant="primary" onClick={() => setPage("createPost")}>Create a Post</Button>)}
             </div>
             <div className="post-cards">
                <PostCard />
             </div>
            </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home