const axios = require("axios");

function createRemoteDB(host, port) {
  const url = `http://${host}:${port}`;

  function list(table) {
    return req("GET", table);
  }
  async function req(method, table, data) {
    let uri = `${url}/${table}`;
    const config = {
      url: uri,
      method,
      data,
    };
    try {
      const peticion = await axios(config);
      return peticion.data.body;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  function get(table, id) {
    return req("GET", `${table}/${id}`);
  }
  function upsert(table, data) {
    if (data && data.id) {
      return req("DELETE", table, data);
    }
  }
  function query(table, query, join) {}

  return {
    list,
    get,
    upsert,
    query,
  };
}

module.exports = createRemoteDB;
