const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  player_name: String,
  roll_no: String,
  year: String,
  team_status: String,
});

const scoreSchema = new mongoose.Schema({
  teams: String,
  round1: String,
  round2: String,
  round3: String,
});

const matchSchema = new mongoose.Schema({
  name: String,
  status: String,
  gender: String,
  scores: [scoreSchema],
  players: [playerSchema], // Change from 'teamPlayers' to 'players'
});

const V_m = mongoose.model("V_m", matchSchema);

module.exports = V_m;
