import express from "express";
import webSocket from "ws";
import http from "http";
import livereloadMiddleware from "connect-livereload";
import livereload from "livereload";
import {handle} from "express/lib/router";

const app = express();

/* Auto Refresh Middleware */
const liveServer = livereload.createServer({
    exts:["js", "pug", "css"],
    delay: 1000,
});

liveServer.watch(__dirname);


app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use(livereloadMiddleware());
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));


const handleListen = () => console.log(`Listening on local port 3000`);

const server = http.createServer(app);
const wsServer = new webSocket.Server( { server } );

server.listen(3000, handleListen);
