require("dotenv").config();
const express = require("express");
const config = require("./../config");
const errors = require("./network/errors");
const user = require("./components/user/network");
const post = require("./components/post/network");
const auth = require("./components/auth/network");

const app = express();
app.use(express.json());

// Router

app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/post", post);
app.use(errors);

app.listen(config.port, () => {
  console.log(`El servidor esta corriendo en el puerto: ${config.port}`);
});
