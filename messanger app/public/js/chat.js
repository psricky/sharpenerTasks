const sendBtn = document.getElementById("sendBtn");

const messageInput = document.getElementById("messageInput");

const chatBody = document.getElementById("chatBody");

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});

function sendMessage() {

    const text = messageInput.value.trim();

    if (text === "") {

        return;

    }

    const now = new Date();

    const time = now.toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

    const message = document.createElement("div");

    message.className = "message sent";

    const p = document.createElement("p");
    p.innerText = text;

    const span = document.createElement("span");
    span.innerText = time;

    message.appendChild(p);
    message.appendChild(span);

    chatBody.appendChild(message);

    messageInput.value = "";

    chatBody.scrollTop = chatBody.scrollHeight;

}