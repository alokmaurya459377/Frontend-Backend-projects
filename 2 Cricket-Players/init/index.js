const mongoose = require("mongoose");
const initData = require("./data.js");
const Player = require("../models/player.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/teamindia";

main()
  .then(() => {
    console.log("connected to databases");
  })
  .catch((err) => {
    console.log(err);
  })

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async() => {
  await Player.deleteMany({});
  await Player.insertMany(initData.data);
  console.log("data was initialized");
}

initDB();
