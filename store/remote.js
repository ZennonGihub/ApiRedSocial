const axios = require("axios");

module.exports = function createRemoteDB(host, port) {
  const url = `http://${host}:${port}`;

  function list(table) {
    return req("GET", table);
  }
  function get(table, id) {
    return req("GET", `${table}/${id}`);
  }
  function create(table, data) {
    return req("POST", table);
  }
  function update(table, id, data) {
    return req("PATCH", `${table}/${id}`);
  }
  function remove(table, id) {
    return req("DELETE", `${table}/${id}`);
  }
  function query(table, query, join) {
    return req("GET", table, { query, join });
  }

  async function req(method, table, data, { params } = {}) {
    let uri = `${url}/${table}`;
    const config = {
      url: uri,
      params,
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

  return {
    list,
    get,
    create,
    update,
    remove,
    query,
  };
};
