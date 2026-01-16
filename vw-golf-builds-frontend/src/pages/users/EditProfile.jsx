import "./EditProfile.css"
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import PostCard from "../../components/posts/PostCard";

function EditProfile({setPage}) {
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("http://localhost:5000/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await res.json();
            setProfile(data);

            setName(data.user.name);
            setEmail(data.user.email);
            setBio(data.user.bio || "");
        }

        fetchUser();
    }, []);

    if (!profile) {
        return <p>Loading profile...</p>
    }

    //user profile update
    async function handleProfileUpdate(e) {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("http://localhost:5000/api/auth/me", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({name, bio})
        })

            const data = await res.json();

            if(res.ok) {
            console.log("Profile updated successfully");
            setProfile((prevProfile) => ({
                ...prevProfile,
                user: data
            }));
            } else {
            console.error("Error updating profile")
            }

            setLoading(false);
            setPage("userProfile");
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
                    <label>Name</label>
                    <Input type="text" value={name} placeholder={profile?.user.name} onChange={e => setName(e.target.value)} />
                    <label>Bio</label>
                    <Input type="text" value={bio} placeholder={profile?.user.bio || 'Short bio'} onChange={e => setBio(e.target.value)} />
                </div>
                <div className="buttons">
                    <button onClick={() => setPage("userProfile")} className="cancel-btn">X Cancel</button>
                    {/* floppy disk icon goes here */}
                    <button className="save-changes-btn" onClick={handleProfileUpdate} disabled={loading}>Save Changes</button>
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