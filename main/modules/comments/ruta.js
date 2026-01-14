const {
  list,
  getOneComment,
  createComment,
  removeComment,
  updateComment,
  likeComment,
} = require("./controller.js");
const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/list", list);
router.get("/list", getOneComment);
router.post("/list", createComment);
router.delete("/list", removeComment);
router.patch("/list", updateComment);
router.post("/list", likeComment);

module.exports = router;
