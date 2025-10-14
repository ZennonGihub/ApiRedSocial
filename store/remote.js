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
    return req("POST", table, data);
  }
  function update(table, id, data) {
    return req("PATCH", `${table}/${id}`, data);
  }
  function remove(table, id) {
    return req("DELETE", `${table}/${id}`);
  }
  function query(table, params) {
    return req("GET", table, null, { params });
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
      // 500 o 404
      if (error.response) {
        {
          console.error("[remote error]", error.response);
          throw new Error(
            `API Error: ${error.response.status} - ${error.response.data.message || error.message}`
          );
        }
      } else if (error.request) {
        // la peticion fue hecha pero no hubo respuesta
        throw new Error("NETWORK Error");
      } else {
        // Otro tipo de error
        throw new Error(`Request setup error: ${error.message}`);
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
  }
};
