const API_URL = "http://localhost:5000/api/posts"

//create post function
export async function createPost(postData) {
    const token = localStorage.getItem("token");

    const response = await fetch (API_URL, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    });

    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.message || "Failed to create a post");
    }

    return data;
}

//fetching posts function
export async function getPosts() {
    const response = await fetch(API_URL);

    if(!response.ok) {
        throw new Error(data.message || "Failed to fetch the posts!")
    }

    const data = await response.json();

    return data
}