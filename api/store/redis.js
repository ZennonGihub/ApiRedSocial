const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => {});

const connect = async () => {
  try {
    await client.connect();
  } catch (error) {
    throw error.message;
  }
};

async function get(tabla) {
  if (!tabla) return null;
  const result = await client.get(tabla);
  if (result === null) return null;
  return JSON.parse(result);
}

async function getId(tabla, id) {
  if (!tabla) return null;
  let key = `${tabla}:${id}`;
  return await get(key);
}

async function set(key, value) {
  if (!value) return null;
  const result = await client.set(key, JSON.stringify(value));
  if (result === null) return null;
  return result;
}

module.exports = {
  get,
  getId,
  set,
  connect,
};
