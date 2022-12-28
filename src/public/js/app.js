const socket = io();

const welcomeDiv = document.getElementById("welcome");
const welcomeForm = welcomeDiv.querySelector("form");
const room = document.getElementById("room");
const messageForm = room.querySelector("form");

room.hidden = true;

let roomName;

function showRoom() {
    room.hidden = false;
    welcomeDiv.hidden = true;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room: ${roomName}`;
}

function addMessage(message) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message
    ul.appendChild(li);
}

function handleRoomSubmit(event) {
    event.preventDefault();

    const input = this.querySelector('input');
    socket.emit("enter_room", input.value, showRoom)
    roomName = input.value;
    input.value = ""
}

function handleMessageSubmit(event) {
    event.preventDefault();

    const input = this.querySelector('input');
    const value = input.value;
    socket.emit("new_message", value, roomName, () => {
        addMessage(`You: ${value}`);
    });

    input.value = "";
}

socket.on("welcome", () => {
    addMessage("Someone joined!");
})

socket.on("bye", () => {
    addMessage("Someone left!");
})

socket.on("new_message", addMessage);

welcomeForm.addEventListener("submit", handleRoomSubmit);
messageForm.addEventListener("submit", handleMessageSubmit);