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
    const [userId, setUserId] = useState(null);

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

    useEffect(() => {
        async function fetchCurrentUser() {
            if (!isAuthenticated) return;

            try{
                const res = await fetch("http://localhost:5000/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                const data = await res.json();
                setUserId(data.user._id);
            } catch (err) {
                console.error("Fail to fetch user", err)
            }
        }

        fetchCurrentUser();
    }, [isAuthenticated]);

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
                    <PostCard key={post._id} post={post} isLoggedIn={isAuthenticated} userId={userId}/>
                ))}
             </div>
            </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home