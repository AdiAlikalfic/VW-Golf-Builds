import "./PostCard.css"
import golfMk3 from "../../assets/vw-golf-mk3-build.jpg"
import gzuz from "../../assets/gzuz.jpg"

function PostCard() {

    return(
        <div className="post-card">
            <img src={golfMk3} alt="golf mk3 build" />
            <div className="user-info">
                <div className="user-profile-img">
                    <img src={gzuz} alt="user's profile picture" />
                </div>
                <div className="user-name-and-date">
                    <p className="user-name">Gzuz Gazo</p>
                    <p className="post-date">12.6.2025</p>
                </div>
                <div className="likes">
                    <div className="likes-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                         <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                        </svg>
                    </div>
                    <div className="likes-number">
                        <p>187</p>
                    </div>
                </div>
            </div>
            <div className="car-tag">
                <p className="car-model">Golf Mk 3</p>
                <p className="car-year">1998</p>
            </div>
            <div className="post-details">
                <p className="post-title">VW Golf Mk3</p>
                <p className="post-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel sapien nec nulla facilisis luctus sed eu magna.
                </p>
            </div>
        </div>
    )
}

export default PostCard