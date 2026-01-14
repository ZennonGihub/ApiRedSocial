const response = require("../../Response/response.js");
const controller = require("./dependencia.js");

const { client } = require("../../store/redis.js");

// Buscar posts
const list = async (req, res, next) => {
  try {
    const listaCache = await client.get("posts");

    if (listaCache) {
      return response.success(req, res, JSON.parse(listaCache), 200);
    }
    const lista = await controller.list();
    const saveResult = await client.set("posts", JSON.stringify(lista), {
      EX: 60,
    });
    response.success(req, res, lista, 200);
  } catch (error) {
    next(error);
  }
};

// Buscar 1 post
const getOnePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await controller.getPost(id);
    response.success(req, res, result, 200);
  } catch (error) {
    next(error);
  }
};

// Actualizar post
const updatePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const post = await controller.update(id, body);
    response.success(req, res, post, 200);
  } catch (error) {
    next(error);
  }
};

// Crear post
const createPost = async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;
    const post = await controller.create(user, body);
    response.success(req, res, post, 201);
  } catch (error) {
    next(error);
  }
};

// Eliminar post
const removePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const postRemoved = await controller.remove(id);
    response.success(req, res, postRemoved, 201);
  } catch (error) {
    next(error);
  }
};

// Like a post
const likePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await controller.insertForeignKey(id, req.body);
    response.success(req, res, post, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list,
  getOnePost,
  updatePost,
  createPost,
  removePost,
  likePost,
};
