const socket = io();
socket.on("connect", () => {

    console.log("Connected");

});
socket.on("receive-message", function (chat) {

    displayMessage(chat);

});
document.getElementById("logoutBtn").addEventListener("click", function () {
    // Clear the token and login status from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    // Redirect to login page
    window.location.href = "/";
}
);
const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "/";

}

const chatMessages = document.getElementById("chatMessages");

const inputMessage = document.getElementById("message");

const sendBtn = document.getElementById("sendBtn");

document.addEventListener("DOMContentLoaded", loadMessages);

async function loadMessages() {

    try {

        const response = await axios.get(

            "http://localhost:3000/chat/message",

            {

                headers: {

                    Authorization: token

                }

            }

        );

       
        response.data.forEach((chat)=> {

            displayMessage(chat);

        });

        chatMessages.scrollTop = chatMessages.scrollHeight;

    }

    catch (err) {

        console.log(err);

    }

}
function displayMessage(chat) {

    console.log(chat);
    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    const currentUserId = Number(localStorage.getItem("currentUserId"));

    if (chat.userId === currentUserId) {

        messageDiv.classList.add("sent");

    }
    else {

        messageDiv.classList.add("received");

    }

    const sender = document.createElement("div");

    sender.classList.add("sender");

    sender.textContent = chat.name;

    const text = document.createElement("div");

    text.textContent = chat.message;

    const time = document.createElement("span");

    time.classList.add("time");

    const date = new Date(chat.createdAt);

    time.textContent = date.toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

    messageDiv.appendChild(sender);

    messageDiv.appendChild(text);

    messageDiv.appendChild(time);

    chatMessages.appendChild(messageDiv);

}
sendBtn.addEventListener("click", sendMessage);

inputMessage.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});

async function sendMessage() {

    const message = inputMessage.value.trim();

    if (message === "") {

        return;

    }

    try {


        const response = await axios.post(

            "http://localhost:3000/chat/message",

            {

                message

            },

            {

                headers: {

                    Authorization: token

                }

            }

        );

        inputMessage.value = "";

        chatMessages.scrollTop = chatMessages.scrollHeight;

    }

    catch (err) {

        console.log(err);

    }

}

