const express = require("express");
const router = express.Router();
const Player = require("../models/player.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { playerJoiSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");

const validatePlayer = (req, res, next) => {
  let { error } = playerJoiSchema.validate(req.body);
  // console.log(error);
  if (error) {
    throw new ExpressError(404, error);
  } else {
    next();
  }
}

// index route
router.get("/", wrapAsync(async (req, res) => {
  const allPlayers = await Player.find({});
  res.render("players/index.ejs", { allPlayers });
}));

// Add player
router.get("/add", wrapAsync(async (req, res) => {
  res.render("players/add.ejs");
}));

// show route
router.get("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const player = await Player.findById(id);
  res.render("players/show.ejs", { player });
}));

// create route
router.post("/", validatePlayer, wrapAsync(async (req, res, next) => {
  let createPlayer = req.body.player;
  const newPlayer = new Player(createPlayer);
  await newPlayer.save();
  res.redirect("/players");
}));

// Edit  route
router.get("/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const player = await Player.findById(id);
  res.render("players/edit.ejs", { player });
}));

// Update route
router.put("/:id", validatePlayer, wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Player.findByIdAndUpdate(id, { ...req.body.player });
  res.redirect(`/players/${id}`);
}));

// Delete route
router.delete("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Player.findByIdAndDelete(id);
  res.redirect("/players");
}));

module.exports = router;