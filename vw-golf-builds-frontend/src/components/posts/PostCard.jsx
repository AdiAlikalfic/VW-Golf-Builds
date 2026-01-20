import "./PostCard.css"
import { useState } from "react"
import golfMk3 from "../../assets/vw-golf-mk3-build.jpg"
import { CgProfile } from "react-icons/cg";
import { CiHeart } from "react-icons/ci";
import { IoHeart } from "react-icons/io5";
import { truncate } from "../../utils/text-shortner"

function PostCard({post, isLoggedIn, userId}) {
    const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
    const [liked, setLiked] = useState(post.likes?.includes(userId));

    const authorId = typeof post.author === "string" ? post.author : post.author?._id;
    
    const isOwnPost = authorId === userId;

    const isDisabled = !isLoggedIn || isOwnPost;

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

        if(!res.ok) {
            console.warn(data.message);
            return;
        }

        setLikesCount(data.likesCount);
        setLiked(data.likedByUser)
    }

    console.log("USER:", userId);
console.log("AUTHOR:", authorId);
console.log("OWN POST?", isOwnPost);


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
                    <div 
                    className={`likes-icon ${isDisabled ? "disabled" : ""}`} 
                    onClick={() => {
                        if (isDisabled) return;
                        handleLike();
                    }}
                    >
                        {liked ? (
                        <IoHeart size={16} />
                        ) : (
                        <CiHeart size={20} />
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