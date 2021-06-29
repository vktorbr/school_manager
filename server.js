const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");

const server = express();

server.use(express.static("public"));
server.use(routes);

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    noCache: true,
    autoescape: false
});

//inicializa o server
server.listen(5001, function(){
    console.log("server is running");
})