const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const emailorphone = document.getElementById("emailorphone").value.trim();
    const password = document.getElementById("password").value.trim();


    try {

        const response = await axios.post(
            "http://localhost:3000/user/login",
            {
                emailorphone,
                password
            }
        );

        localStorage.setItem("currentUser", JSON.stringify(response.data.user));

        // Save JWT Token
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", "true");

        loginForm.reset();
        const token = localStorage.getItem("token");

        if (!token) {

            window.location.href = "/";

        }
        window.location.href = "/chat/chatpage";


    } catch (error) {

        if (error.response) {

            if (error.response.status === 401) {
                message.textContent = "Incorrect Password";
            }

            else if (error.response.status === 404) {
                message.textContent = "User does not exist";
            }

            else {
                message.textContent = error.response.data.message || "Login Failed";
            }

        } else {
            message.textContent = "Unable to connect to server.";
        }

        message.style.color = "red";
        message.style.display = "block";
    }

});