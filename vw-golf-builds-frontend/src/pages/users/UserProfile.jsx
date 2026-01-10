import "./UserProfile.css"
import React from "react"
import gzuz from "../../assets/gzuz.jpg"
import EditProfile from "./EditProfile"

function UserProfile({setPage}) {

    return (
        <div className="user-profile-page">
            <div className="user-profile-info">
                <div className="user-avatar">
                    <img src={gzuz} alt="user's avatar image" />
                </div>
                <div className="user-details">
                    <p>Username</p>
                    <div className="user-email-and-date">
                        {/* email icon goes here */}
                        <p>User email</p>
                        {/* calendar icon goes here */}
                        <p>Sign up date</p>
                    </div>
                    <div className="user-bio">
                        {/* User bio */}
                        <p>VW Golf enthusiast and track day lover. Building my dream Golf one mod at a time.</p>
                    </div>
                    <hr />
                <div className="likes-and-posts-count">
                    <p className="likes"><strong>0</strong>Total likes</p>
                    <p className="posts"><strong>0</strong>Posts</p>
                </div>
                </div>
                <div className="edit-profile-btn">
                    {/* edit icon goes here */}
                <button onClick={() => setPage("editProfile")}>Edit Profile</button>
                </div>
            </div>
        </div>
    )
}

export default UserProfile