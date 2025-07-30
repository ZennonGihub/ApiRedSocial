const db = {
  user: [
    { id: 1, name: "javascript", username: "carlos", age: 17, password: 12345 },
  ],
};

async function getFullDb() {
  return db;
}

async function list(table) {
  return db[table] || [];
}
async function get(table, id) {
  let tabla = await list(table);
  let newId = tabla.find((item) => item.id == id);
  if (!newId) {
    throw new Error(
      `Valores ingresados incorrectos, favor de revisar nuevamente`
    );
  }
  return newId;
}
async function update(table, id, body) {
  const tableTarget = await list(table);
  const indice = tableTarget.findIndex((item) => item.id == id);
  if (indice === -1) {
    throw new Error(`Porfavor revise los valores ingresados`);
  }
  const object = tableTarget[indice];
  const newObject = { ...object, ...body };
  db[table][indice] = newObject;
  return newObject;
}

async function create(table, body) {
  if (!db[table]) {
    db[table] = [];
  }
  const tableTarget = db[table];
  let newId = 1;
  if (tableTarget.length > 0) {
    const lastItem = tableTarget[tableTarget.length - 1];
    newId = lastItem.id + 1;
  }
  const newObject = {
    id: newId,
    ...body,
  };
  tableTarget.push(newObject);
  return newObject;
}
async function remove(table, id) {
  const tabla = await list(table);
  const indice = tabla.findIndex((item) => item.id == id);
  if (indice === -1) {
    throw new Error(`Datos invalidos vuelve a revisar`);
  }
  const [objectRemove] = db[table].splice(indice, 1);
  return objectRemove;
}

async function query(table, q) {
  let tabla = await list(table);
  const keys = Object.keys(q);
  const key = keys[0];
  let newId = tabla.filter((item) => item[key] == q[key]) || null;
  console.log("Este es mi usuario: ", newId);
  return newId;
}

module.exports = {
  getFullDb,
  list,
  get,
  update,
  create,
  remove,
  query,
};
