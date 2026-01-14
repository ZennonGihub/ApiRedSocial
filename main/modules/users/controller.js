const response = require("../../Response/response");
const controller = require("./dependencia");

const lista = async (req, res, next) => {
  try {
    const list = await controller.list();
    response.success(req, res, list, 200);
  } catch (error) {
    next(error);
  }
};

const getOneUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await controller.get(id);
    response.success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const nuevoUser = await controller.update(id, body);
    response.success(req, res, nuevoUser, 200);
  } catch (error) {
    next(error);
  }
};

const getOneFollower = async (req, res, next) => {
  try {
    const userFollowing = await controller.following(req.params.id);
    response.success(req, res, userFollowing, 201);
  } catch (error) {
    next(error);
  }
};

const createFollow = async (req, res, next) => {
  try {
    const userFrom = req.user.user_id;
    const userTo = req.params.id;
    console.log("req.user: ", req.user);
    console.log("User From:", userFrom, "User To:", userTo);
    await controller.follow(userFrom, userTo);
    response.success(req, res, null, 201);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userRemove = await controller.remove(id);
    response.success(req, res, userRemove, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  lista,
  getOneUser,
  updateUser,
  deleteUser,
  createFollow,
  getOneFollower,
};
