const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  player_name: String,
  roll_no: Number,
  year: Number,
  team_status: String,
});

const scoreSchema = new mongoose.Schema({
  teams: String,
  round1: Number,
});

const matchSchema = new mongoose.Schema({
  name: String,
  status: String,
  scores: [scoreSchema],
  players: [playerSchema], // Change from 'teamPlayers' to 'players'
});

const TW_m = mongoose.model("TW_m", matchSchema);

module.exports = TW_m;
