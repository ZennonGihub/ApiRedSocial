require("dotenv").config();
const express = require("express");
const config = require("./../config");
const errors = require("./../api/network/errors");
const post = require("./components/post/network");

const app = express();
app.use(express.json());

// Router

app.use("/api/post", post);
app.use(errors);

app.listen(config.postPort, () => {
  console.log(`El servidor esta corriendo en el puerto: ${config.postPort}`);
});
