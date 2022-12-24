const socket = io();

const welcomeDiv = document.getElementById("welcome");
const form = welcomeDiv.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function showRoom() {
    room.hidden = false;
    welcomeDiv.hidden = true;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room: ${roomName}`;
}

function handleRoomSubmit(event) {
    event.preventDefault();

    const input = this.querySelector('input');
    socket.emit("enter_room", input.value, showRoom)
    roomName = input.value;
    input.value = ""
}

form.addEventListener("submit", handleRoomSubmit);