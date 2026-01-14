const {
  list,
  getOnePost,
  updatePost,
  createPost,
  removePost,
  likePost,
} = require("./controller");
const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/", list);
router.get("/:id", getOnePost);
router.patch("/:id", updatePost);
router.post("/", createPost);
router.delete("/:id", removePost);
router.post("/:id", likePost);

module.exports = router;
