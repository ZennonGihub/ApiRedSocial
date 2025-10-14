const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => {
  console.log("Redis Client Error", err);
});

const main = async () => {
  try {
    await client.connect();
    console.log("base de datos conectada ", client.isOpen);
  } catch (error) {
    throw error;
  }
};

module.exports = main;
