const response = require("../../Response/response.js");
const controller = require("./dependencia.js");

const login = async (req, res, next) => {
  try {
    const user = req.user;
    const userToken = await controller.login(user);
    response.success(req, res, userToken, 201);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const body = req.body;
    const nuevoUser = await controller.create(body);
    response.success(req, res, nuevoUser, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = { login, createUser };
