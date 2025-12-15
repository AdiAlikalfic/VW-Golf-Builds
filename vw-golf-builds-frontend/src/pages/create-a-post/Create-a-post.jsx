import "./Create-a-Post.css";
import {useDropzone} from "react-dropzone";
import { useCallback, useState } from "react";
import { createPost } from "../../api/postApi";
import Select from "react-select";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

function CreatePost({setPage}) {
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [model, setModel] = useState(null);
    const [year, setYear] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setImage(URL.createObjectURL(file))
    }, []);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: {"image/*": []},
    });

    const modelOptions = [
        {value: "Golf Mk8", label:"Golf Mk8"},
        {value: "Golf Mk7", label:"Golf Mk7"},
        {value: "Golf Mk6", label:"Golf Mk6"},
        {value: "Golf Mk5", label:"Golf Mk5"},
        {value: "Golf Mk4", label:"Golf Mk4"},
        {value: "Golf Mk3", label:"Golf Mk3"},
        {value: "Golf Mk2", label:"Golf Mk2"},
        {value: "Golf Mk1", label:"Golf Mk1"}
    ]

    const yearOptions = [
        {value: "2020-2025", label: "2020-2025"},
        {value: "2015-2019", label: "2015-2019"},
        {value: "2009-2014", label: "2009-2014"},
        {value: "2003-2008", label: "2003-2008"},
        {value: "1997-2002", label: "1997-2002"}
    ]

    async function handleCreatePost() {
        if (!title || !description || !model || !year) {
            alert("All fields are required!")
            return;
        }

        try {
            const postData = {
                title,
                content: description,
                carModel: model,
                carYear: year,
                // image 
            };

            await createPost(postData);
            console.log(postData);
            
            setPage("home");
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="create-post-page">
            <div className="create-page-navbar">
                <div className="back-btn">
                    <Button variant="secondary" onClick={() => setPage("home")}>
                        <span className="back-icon">←</span>
                        Back
                    </Button>
                </div>
                <div className="header">
                    <h3>Post New Build</h3>
                </div>
            </div>
            <div className="add-photo-section">
                <h4>Build Photos</h4>
                <p>Add up to 5 photos of your build. First image will be the cover photo.</p>
                <div {...getRootProps()} className="drop-zone">
                 <input {...getInputProps()} />
                 {image ? (
                    <img src={image} className="preview-img" />
                 ) : (
                    <p>Drop image here or click to choose</p>
                   )}
                 </div>
            </div>
            <div className="basic-information-section">
                <div className="year-and-model-dropdowns">
                <div className="model-dropdown">
                    <p>Model *</p>
                    <Select
                      options={modelOptions}
                      placeholder="Choose model"
                      onChange={(option) => setModel(option.value)}
                    />
                </div>
                <div className="year-dropdown">
                    <p>Year *</p>
                    <Select
                      options={yearOptions}
                      placeholder="Choose year"
                      onChange={(option) => setYear(option.value)}
                    />
                </div>
                </div>
                <div className="build-title">
                    <p>Build Title *</p>
                    <Input
                     type="text" 
                     placeholder="e.g., VW Golf Mk3 build" 
                     value={title} 
                     onChange={(e) => setTitle(e.target.value)} 
                     />
                </div>
                <div className="description-section">
                    <p>Description *</p>
                    <Input
                     type="text" 
                     placeholder="Share details about your build like performance improvements, mods and your overall experience..." 
                     onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
            </div>
            <div className="posting-agreement">
                <p>
                    By posting, you agree to share your build with the VW Golf community. Please ensure all information is accurate and photos are your own.

                    Your post will be visible to all users immediately after publishing.
                </p>
                <div className="agreement-btns">
                     <Button variant="danger">Cancel</Button>
                     <Button variant="primary" onClick={handleCreatePost}>Publish Build</Button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost