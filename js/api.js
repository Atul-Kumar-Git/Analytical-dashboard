const BASE_URL = "http://localhost:5000/api";

function getToken() {
    return localStorage.getItem("token");
}

async function apiRequest(endpoint, method, data = null) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: data ? JSON.stringify(data) : null
    });

    return res.json();
}