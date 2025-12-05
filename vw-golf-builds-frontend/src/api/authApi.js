const API_URL = "http://localhost:5000/api/auth"

//login auth function
export async function loginUser(credidentials) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credidentials)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed")
    }

    return data
}

//register auth function
export async function registerUser(userData) {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.message || "Register failed")
    }

    return data
}