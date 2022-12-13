const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connected to the SERVER");
});

socket.addEventListener("message", (message) => {
   const li = document.createElement("li");
   li.innerText = message.data;
   messageList.append(li);
})

socket.addEventListener("close", () => {
    console.log("Disconnected from the SERVER");
})

function makeMessage(type, payload) {
    const msg = { type, payload }
    return JSON.stringify(msg);
}

function handleNickSubmit(event) {
    event.preventDefault();

    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
}

function handleSubmit(event) {
    event.preventDefault();

    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new-message", input.value));
    input.value = "";
}

nickForm.addEventListener("submit", handleNickSubmit);
messageForm.addEventListener("submit", handleSubmit);


// setTimeout(() => {
//     socket.send("hello from the BROWSER!");
// }, 10000);