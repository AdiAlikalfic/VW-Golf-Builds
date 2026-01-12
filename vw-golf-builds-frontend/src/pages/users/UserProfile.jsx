import "./UserProfile.css"
import { useEffect, useState } from "react"
import Button from "../../components/ui/Button"
import { CgProfile } from "react-icons/cg";

function UserProfile({setPage}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("http://localhost:5000/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await res.json();
            setUser(data);
        }

        fetchUser();
    }, []);

    return (
        <div className="user-profile-page">
            <div className="user-profile-info">
                <div className="user-avatar">
                    <CgProfile size={100} />
                </div>
                <div className="user-details">
                    <p>{user?.name}</p>
                    <div className="user-email-and-date">
                        {/* email icon goes here */}
                        <p>{user?.email}</p>
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
            <p className="builds-count">My builds (0)</p>
            <div className="user-builds">
                <h4>No builds yet</h4>
                <p>Start sharing your VW Golf builds with the community!</p>
                <Button variant="primary" onClick={() => setPage("createPost")} size={35}>Create your first build</Button>
            </div>
        </div>
    )
}

export default UserProfile