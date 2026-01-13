import "./UserProfile.css"
import { useEffect, useState } from "react"
import Button from "../../components/ui/Button"
import PostCard from "../../components/posts/PostCard";
import { CgProfile } from "react-icons/cg";

function UserProfile({setPage}) {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("http://localhost:5000/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await res.json();
            setProfile(data);
        }

        fetchUser();
    }, []);

    if (!profile) {
        return <p>Loading profile...</p>
    }

    return (
        <div className="user-profile-page">
            <div className="user-profile-info">
                <div className="user-avatar">
                    <CgProfile size={100} />
                </div>
                <div className="details-and-btn">
                <div className="user-details">
                    <p>{profile?.user?.name}</p>
                    <div className="user-email-and-date">
                        {/* email icon goes here */}
                        <p>{profile?.user?.email}</p>
                        {/* calendar icon goes here */}
                        <p> Member since {profile?.user?.createdAt && new Date(profile.user.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="user-bio">
                        {/* User bio */}
                        <p>{profile?.user?.bio || "No bio"}</p>
                    </div>
                    <hr />
                <div className="likes-and-posts-count">
                    <p className="likes"><strong>{profile?.totalLikes ?? 0}</strong>Total likes</p>
                    <p className="posts"><strong>{profile?.postsCount ?? 0}</strong>Posts</p>
                </div>
                </div>
                <div className="edit-profile-btn">
                    {/* edit icon goes here */}
                <button onClick={() => setPage("editProfile")}>Edit Profile</button>
                </div>
                </div>
            </div>
            <p className="builds-count">My builds ({profile?.posts.length})</p>
            <div className="user-builds">
                {profile?.posts.length === 0 ? (
                <>
                <h4>No builds yet</h4>
                <p>Start sharing your VW Golf builds with the community!</p>
                <Button variant="primary" onClick={() => setPage("createPost")} >Create your first build</Button>
                </>
                ) : (
                    profile.posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))
                )}
                
            </div>
        </div>
    )
}

export default UserProfile