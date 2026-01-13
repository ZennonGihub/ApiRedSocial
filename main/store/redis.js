const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

async function get(tabla) {
  if (!tabla) return null;
  const result = await client.get(tabla);
  if (!result) return null;
  return JSON.parse(result);
}

async function getId(tabla, id) {
  if (!tabla) return null;
  let key = `${tabla}:${id}`;
  return await get(key);
}

async function set(key, value) {
  if (!value) return null;
  const result = await client.set(key, JSON.stringify(value), { EX: 60 });
  if (result === null) return null;
  return result;
}

async function remove(key) {
  if (!key) return null;
  try {
    await client.del(key);
    return true;
  } catch (error) {
    console.error("Error al remover la keys en redis:", error);
  }
}

async function removeId(tabla, id) {
  if (!tabla || !id) return null;
  let key = `${tabla}:${id}`;
  return await remove(key);
}

module.exports = {
  get,
  getId,
  set,
  remove,
  removeId,
  client,
};
