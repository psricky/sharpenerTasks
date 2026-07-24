const socket=io("http://localhost:3000",{
    auth: {
        token: localStorage.getItem("token")
    }
});
socket.on("connect", () => {

    console.log("Connected");

});

socket.on("chat-message", function (chat) {    //receive the new message from backend

    displayMessage(chat);
    chatMessages.scrollTop = chatMessages.scrollHeight;

});

socket.on("connect_error", (err) => {

    console.log(err.message);

});

document.getElementById("logoutBtn").addEventListener("click", function () {
    
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    
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

       chatMessages.innerHTML = "";
       
       response.data.forEach((message)=> {

            displayMessage(message);

        });

        chatMessages.scrollTop = chatMessages.scrollHeight;

    }

    catch (err) {

        console.log(err);

    }

}
function displayMessage(message) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");
    
    const currentUserId=Number(localStorage.getItem("currentUserId"));

    if (message.UserId === currentUserId) {

        messageDiv.classList.add("sent");

    }
    else {

        messageDiv.classList.add("received");

    }

    const sender = document.createElement("div");

    sender.classList.add("sender");

    sender.textContent = message.User.name;

    const text = document.createElement("div");

    text.textContent = message.message;

    const time = document.createElement("span");

    time.classList.add("time");

    const date = new Date(message.createdAt);

    time.textContent = date.toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

    messageDiv.appendChild(sender);

    messageDiv.appendChild(text);

    messageDiv.appendChild(time);

    chatMessages.appendChild(messageDiv);

}
sendBtn.addEventListener("click", ()=>{
    
    sendMessage()

})

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


        await axios.post(

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

