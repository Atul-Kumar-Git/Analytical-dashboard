// REGISTER
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            age: document.getElementById("age").value,
            gender: document.getElementById("gender").value
        };

        try {
            const res = await apiRequest("/register", "POST", data);

            console.log("Register response:", res); // 🔥 debug

            alert(res.message || "Registered successfully");

            window.location.href = "login.html";

        } catch (err) {
            console.error("Register error:", err);
            alert("Registration failed");
        }
    });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        };

        const res = await apiRequest("/login", "POST", data);

        if (res.token) {
            localStorage.setItem("token", res.token);
            window.location.href = "index.html";
        } else {
            alert("Login failed");
        }
    });
}