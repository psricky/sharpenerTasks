const signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", async function (e) {
    try {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value; 
        const password = document.getElementById("password").value;

        // Ensure key names match exactly what backend expects
        const userData = { name, email, phone, password }; 
        
        const response = await axios.post("http://localhost:3000/user/signup", userData);
        alert("Signup successful! Please login to continue.");
        signupForm.reset(); // Reset the form after successful signup
        window.location.href = "/"; 
        
       
    } catch (error) {
        // Log the actual server response message if available
        console.error("Signup failed:", error.response?.data?.message || error.message);
    }
});