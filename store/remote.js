const request = require("request");

function createRemotedDB(host, port) {
  const URL = `http://${host}:${port}`;

  function list(table) {
    return req("GET", table);
  }
  function get(table) {
    return req("GET", table);
  }

  function create(table) {
    return req("GET", table);
  }
  function upsert(table) {
    return req("GET", table);
  }
  function req(method, table, data) {
    let url = `${URL}/${table}`;
    let body = "";
    return new Promise((resolve, reject) => {
      request(
        {
          method,
          Headers: {
            "Content-Type": "application/json",
          },
          url,
          body,
        },
        (err, req, body) => {
          if (err) {
            console.error("Error database remote", err);
            return reject(err.message);
          }
          const resp = JSON.parse(body);
          if (resp.error) {
            return reject(resp.error);
          }
          resolve(resp.data);
        }
      );
    });
  }

  return {
    list,
    get,
    create,
    upsert,
  };
}

module.exports = createRemotedDB;
