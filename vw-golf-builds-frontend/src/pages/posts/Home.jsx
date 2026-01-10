import Sidebar from "../../layouts/Sidebar"
import Footer from "../../layouts/Footer"
import PostCard from "../../components/posts/PostCard"
import Button from "../../components/ui/Button"
import { useEffect, useState } from "react"
import { getPosts } from "../../api/postApi"
import "./Home.css"

function Home({isAuthenticated, setPage}) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    if (loading) return <p>Loading Builds...</p>

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
                {posts.map(post => (
                    <PostCard key={post._id} post={post} isLoggedIn={isAuthenticated}/>
                ))}
             </div>
            </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home