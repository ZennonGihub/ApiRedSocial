const mysql = require("mysql2/promise");
const boom = require("@hapi/boom");
const config = require("./../config");

const dbConfig = {
  host: config.host,
  database: config.database,
  password: config.dbpassword,
  user: config.user,
  port: config.portdb,
  connectionLimit: 10,
  multipleStatements: true,
};

// Crea una conexion "pool" con la base de datos
const pool = mysql.createPool(dbConfig);
// Lista de tablas permitidas para no permitir inyecciones sql
const tablesList = [
  "users",
  "auth",
  "posts",
  "follows",
  "comentarios",
  "estadopost",
  "likecomentarios",
  "likepost",
];
const columnsPosts = [
  "title",
  "body",
  "estadoPost_id",
  "user_id",
  "created_at",
  "updated_at",
];
const columnsUser = [
  "id",
  "username",
  "descripcion",
  "created_at",
  "updated_at",
];
const columnsAuth = ["user_id", "password_hash", "email", "updated_at"];
const columnsUserFollow = ["follow_to", "follow_from"];
const columnsComentarios = [
  "id",
  "comentario",
  "user_id",
  "post_id",
  "created_at",
];
const columnsEstadoPost = ["id", "estado"];
const columnsLikePost = ["user_id", "post_id"];
const columnsLikeComentarios = ["user_id", "comentario_id"];

async function list(table) {
  if (!tablesList.includes(table)) {
    throw new Error("Table not allowed");
  }
  try {
    const list = await pool.query(`SELECT * FROM ${table}`);
    return list[0];
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

async function get(table, id) {
  if (!tablesList.includes(table)) {
    throw boom.notFound("Table not allowed");
  }
  try {
    const result = await pool.query(`SELECT * FROM ${table} WHERE id=?`, [id]);
    return result[0];
  } catch (error) {
    throw boom.badData("Error en la consulta");
  }
}

async function getEmail(table, email) {
  if (!tablesList.includes(table)) {
    throw boom.notFound("Table not allowed");
  }
  try {
    const [rows] = await pool.query(`SELECT * FROM ${table} WHERE email=?`, [
      email,
    ]);
    return rows[0];
  } catch (error) {
    throw boom.badData("Error en la consulta de email");
  }
}

async function getUserId(table, id) {
  if (!tablesList.includes(table)) {
    throw boom.notFound("Table not allowed");
  }
  try {
    const [rows] = await pool.query(`SELECT * FROM ${table} WHERE user_id=?`, [
      id,
    ]);
    return rows[0];
  } catch (error) {
    throw boom.badData("Error en la consulta de email");
  }
}

async function update(table, data) {
  if (!tablesList.includes(table)) {
    throw boom.badData("Table not allowed");
  }
  try {
    const { id, ...updateData } = data;
    const result = await pool.query(`UPDATE ${table} SET ? WHERE id=?`, [
      updateData,
      id,
    ]);
    return result[0];
  } catch (error) {
    throw new Error(error.message);
  }
}
async function create(table, data) {
  if (!tablesList.includes(table)) {
    throw new Error("Table not allowed");
  }
  try {
    const { id, ...insertData } = data;
    const result = await pool.query(`INSERT INTO ${table} SET ?`, [insertData]);
    return result[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

function upsert(table, data) {
  if (data && data.id) {
    return update(table, data);
  } else {
    return create(table, data);
  }
}

async function remove(table, id) {
  if (!tablesList.includes(table)) {
    throw boom.badData("Table not allowed");
  }
  try {
    console.log("El id en mysql remove es:", id);
    const result = await pool.query(`DELETE FROM ${table} WHERE id=?`, [id]);
    return result[0];
  } catch (error) {
    throw boom.badData("Error en la consulta");
  }
}

async function getCommentPost(table, idPost, idComment) {
  if (!tablesList.includes(table)) {
    throw boom.notFound("Table not allowed");
  }
  try {
    const [rows] = await pool.query(
      `SELECT * FROM ${table} WHERE post_id=? AND id=?`,
      [idPost, idComment]
    );
    return rows;
  } catch (error) {
    throw boom.badData("Error en la consulta de email");
  }
}

async function query(table, query, join) {
  if (!tablesList.includes(table)) {
    throw new Error("Table not allowed");
  }
  let joinQuery = "";
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];

    if (!tablesList.includes(key)) {
      throw new Error("Join table not allowed");
    }
    const allowedColumns = ["user_id", "post_id", "category_id", "id"];
    if (!allowedColumns.includes(val)) {
      throw new Error("Join column not allowed");
    }
    joinQuery = `JOIN \`${key}\` ON \`${table}\`.\`${val}\` = \`${key}\`.id`;
  }

  try {
    const [rows] = await pool.query(
      `SELECT * FROM \`${table}\` ${joinQuery} WHERE ?`,
      query
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  list,
  getUserId,
  get,
  remove,
  update,
  getEmail,
  upsert,
  query,
  getCommentPost,
  create,
};
