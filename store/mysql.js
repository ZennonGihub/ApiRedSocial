const mysql = require("mysql2");

const config = require("./../config");

const dbConfig = {
  host: config.host,
  database: config.database,
  password: config.dbpassword,
  user: config.user,
  port: config.portdb,
};

let connection;

function handleCon() {
  connection = mysql.createConnection(dbConfig);

  connection.connect((error) => {
    if (error) {
      console.log("[errorDB]", error);

      setTimeout(handleCon, 2000);
    } else {
      console.log("Base de datos conectada");
    }
  });
  connection.on("error", (error) => {
    console.log("[errorDB]", error);
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      handleCon();
    } else {
      throw error;
    }
  });
}

handleCon();

function list(table) {
  console.log("Esta es la base de datos");
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE id=?`,
      [id],
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data.id],
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
}
function create(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

function upsert(table, data) {
  if (data && data.id) {
    return update(table, data);
  } else {
    return create(table, data);
  }
}

function query(table, query) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res[0] || null);
    });
  });
}

module.exports = {
  list,
  get,
  update,
  upsert,
  query,
  create,
};
