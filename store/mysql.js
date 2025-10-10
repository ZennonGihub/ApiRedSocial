const mysql = require("mysql2/promise");

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
const tablesList = ["user", "auth", "post", "user_follow"];
const columnsPost = ["texto", "user"];
const columnsUser = ["name", "username"];
const columnsAuth = ["username", "password"];
const columnsUserFollow = ["user_from", "user_to"];

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
    throw new Error("Table not allowed");
  }
  try {
    const result = await pool.query(`SELECT * FROM ${table} WHERE id=?`, [id]);
    return result[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

async function update(table, data) {
  if (!tablesList.includes(table)) {
    throw new Error("Table not allowed");
  }
  try {
    const result = await pool.query(`UPDATE ${table} SET ? WHERE id=?`, [
      data,
      data.id,
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
    const result = await pool.query(`INSERT INTO ${table} SET ?`, data);
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
  get,
  update,
  upsert,
  query,
  create,
};
