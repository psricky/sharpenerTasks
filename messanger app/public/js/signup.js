// Select the Signup Button
const signupBtn = document.getElementById("signupBtn");

// Add Click Event
signupBtn.addEventListener("click", signup);



// Signup Function
async function signup() {

    try {

        // Read Input Values
        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const phone = document.getElementById("phone").value.trim();

        const password = document.getElementById("password").value.trim();

        const message = document.getElementById("message");



        // Validation
        if (!name || !email || !phone || !password) {

            message.style.color = "red";

            message.innerText = "Please fill all fields.";

            return;
        }



        // Send Request To Server
        const response = await fetch("/signup", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name,

                email,

                phone,

                password

            })

        });



        // Convert Response To JSON
        const data = await response.json();



        // Show Response
        if (data.success) {

            message.style.color = "green";

        }

        else {

            message.style.color = "red";

        }

        message.innerText = data.message;

    }

    catch (error) {

        console.log(error);

        document.getElementById("message").innerText =
            "Something went wrong.";

    }

}