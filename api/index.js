require("dotenv").config();
const express = require("express");
const config = require("./../config");
const errors = require("./Response/errors");
const cookieParser = require("cookie-parser");
const router = require("./router/index");

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(errors);

app.listen(config.port, () => {
  console.log(`El servidor esta corriendo en el puerto: ${config.port}`);
});

router(app);
