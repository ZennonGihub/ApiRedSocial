const express = require("express");
const config = require("./../config");
const router = require("./src/post.router");

const app = express();

app.use(express.json());

app.use("/post", router);

app.listen(config.postPort, () => {
  console.log("Microservicio utilizando el puerto: ", config.postPort);
});

module.exports = app;
