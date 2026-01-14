const express = require("express");
const {
  lista,
  getOneUser,
  updateUser,
  deleteUser,
  createFollow,
  getOneFollower,
} = require("./controller.js");
const passport = require("passport");

const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false }), lista);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getOneUser
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUser
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);
router.post(
  "/follow/:id",
  passport.authenticate("jwt", { session: false }),
  createFollow
);
router.get(
  "/:id/followers",
  passport.authenticate("jwt", { session: false }),
  getOneFollower
);

module.exports = router;
