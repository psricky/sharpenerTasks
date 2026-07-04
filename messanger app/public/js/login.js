// Select Login Button
const loginBtn = document.getElementById("loginBtn");

// Add Click Event
loginBtn.addEventListener("click", login);



// Login Function
async function login() {

    try {

        // Read Input Values
        const emailOrPhone =
            document.getElementById("emailOrPhone").value.trim();

        const password =
            document.getElementById("password").value.trim();

        const message =
            document.getElementById("message");



        // Validation
        if (!emailOrPhone || !password) {

            message.style.color = "red";

            message.innerText = "Please fill all fields.";

            return;
        }



        // Send Request
        const response = await fetch("/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                emailOrPhone,

                password

            })

        });

        if (!response.ok) {

            throw new Error("Request Failed");

        }

        // Convert Response To JSON
        const data = await response.json();




        // Display Message


        if (data.success) {

            localStorage.setItem("token", data.token);


            message.style.color = "green";

            message.innerText = data.message;

            const token = localStorage.getItem("token");

            const response1 = await fetch("/profile", {

                method: "GET",

                headers: {

                    Authorization: token

                }

            });

            const data1 = await response1.json();

            console.log(data1);

        }
        else {

            message.style.color = "red";

            message.innerText = data.message;

        }



    }

    catch (error) {

        console.log(error);

        document.getElementById("message").innerText =
            "Something went wrong.";

    }

}