const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connected to the SERVER");
});

socket.addEventListener("message", (message) => {
    console.log("Message from the server: " + message.data);
})

socket.addEventListener("close", () => {
    console.log("Disconnected from the SERVER");
})

setTimeout(() => {
    socket.send("hello from the BROWSER!");
}, 10000);