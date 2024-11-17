const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: { 
    type: String,
    required: true,
  },
  spouse: {
    type: String,
    default: "Not married",
    set: (v) => v === "" ? "Not married" : v,
  },
  role: String,
  jersey: Number,
  born: String,
  image: {
    type: String,
    default: "https://th.bing.com/th/id/OIG2.9O4YqGf98tiYzjKDvg7L",
    set: (v) => v === "" ? "https://th.bing.com/th/id/OIG2.9O4YqGf98tiYzjKDvg7L" : v, 
  },
  country: String,
});

const Player = mongoose.model("Team", playerSchema);
module.exports = Player;