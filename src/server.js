import express from "express";
import webSocket from "ws";
import http from "http";
import livereloadMiddleware from "connect-livereload";
import livereload from "livereload";
import {handle} from "express/lib/router";

const app = express();

/* Auto Refresh Middleware */
// const liveServer = livereload.createServer({
//     exts:["js", "pug", "css"],
//     delay: 1000,
// });
//
// liveServer.watch(__dirname);


app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use(livereloadMiddleware());
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));


const handleListen = () => console.log(`Listening on local port 3000`);

const server = http.createServer(app);
const wsServer = new webSocket.Server( { server } );
const sockets = [];

wsServer.on("connection", (socket) => {
    console.log("Connected to the BROWSER");
    socket.on("close", () => console.log("Disconnected from the BROWSER"));
    sockets.push(socket);
    socket["nickname"] = "Anon";
    socket.on("message", (msg) => {
      const message = JSON.parse(msg);
      switch(message.type) {
          case "new_message":
              sockets.forEach(aSocket =>
                  aSocket.send(`${socket.nickname}: ${message.payload}`))
          break;
          case "nickname":
              socket["nickname"] = message.payload;
          break;
      }
        // sockets.forEach(aSocket => aSocket.send(message.payload));
    });
});

server.listen(3000, handleListen);

