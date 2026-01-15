import "./PostCard.css"
import { useState } from "react"
import golfMk3 from "../../assets/vw-golf-mk3-build.jpg"
import { CgProfile } from "react-icons/cg";
import { truncate } from "../../utils/text-shortner"

function PostCard({post, isLoggedIn}) {
    const userId = localStorage.getItem("userId");
    const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
    const [liked, setLiked] = useState(post.likes?.includes(userId));

    async function handleLike() {
        const res = await fetch (
            `http://localhost:5000/api/posts/${post._id}/like`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        const data = await res.json();

        setLikesCount(data.likesCount);
        setLiked(data.likedByUser)
    }

    return(
        <div className="post-card">
            <img src={post.image || golfMk3} alt={post.title} />
            <div className="user-info">
                <div className="user-profile-img">
                    <CgProfile size={35} />
                </div>
                <div className="user-name-and-date">
                    <p className="user-name">{post.author?.name}</p>
                    <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="likes">
                    <div className={`likes-icon ${!isLoggedIn ? "disabled" : ""}`} onClick={isLoggedIn ? handleLike : undefined}>
                        {liked ? (
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        fill="currentColor" 
                        className="bi bi-heart-fill" 
                        viewBox="0 0 16 16">
                         <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                        </svg>
                        ) : (
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        fill="currentColor" 
                        className="bi bi-heart" 
                        viewBox="0 0 16 16"
                        >
                         <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                        </svg>
                        )}
                    </div>
                    <div className="likes-number">
                        <p>{likesCount}</p>
                    </div>
                </div>
            </div>
            <div className="car-tag">
                <p className="car-model">{post.carModel}</p>
                <p className="car-year">{post.carYear}</p>
            </div>
            <div className="post-details">
                <p className="post-title">{post.title}</p>
                <p className="post-description">
                    {truncate(post.content || "", 150)}
                </p>
            </div>
        </div>
    )
}

export default PostCard