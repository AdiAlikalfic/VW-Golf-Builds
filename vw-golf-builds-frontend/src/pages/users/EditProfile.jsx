import "./EditProfile.css"
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import PostCard from "../../components/posts/PostCard";

function EditProfile({setPage}) {
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
        <div className="edit-profile-page">
            <div className="edit-profile-form">
                <div className="user-avatar">
                    <CgProfile size={150} />
                    <p className="avatar-url">
                        Avatar URL <Input type="text" placeholder="Paste image link here" />
                    </p>
                </div>
                <div className="form">
                    <label htmlFor="">Name</label>
                    <Input type="text" placeholder={profile?.user.name} />
                    <label htmlFor="">Email</label>
                    <Input type="email" placeholder={profile?.user.email} />
                    <label htmlFor="">Bio</label>
                    <Input type="text" placeholder={profile?.user.bio || 'Short bio'} />
                </div>
                <div className="buttons">
                    <button onClick={() => setPage("userProfile")} className="cancel-btn">X Cancel</button>
                    {/* floppy disk icon goes here */}
                    <button className="save-changes-btn">Save Changes</button>
                </div>
            </div>
            <p className="builds-count">My builds ({profile?.posts.length})</p>
             <div className="user-builds">
                {profile?.posts.length === 0 ? (
                    <div className="no-builds">
                        <h4>No builds yet</h4>
                        <p>Start sharing your VW Golf builds with the community!</p>
                        <Button variant="primary" onClick={() => setPage("createPost")} >Create your first build</Button>
                    </div>
                ) : (
                    profile.posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))
                )}
                
            </div>
        </div>
    )
}

export default EditProfile