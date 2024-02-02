const mongoose = require("mongoose");

const playerSchema1 = new mongoose.Schema({
  player_name: String,
  roll_no: String,
  year: String,
  team_status: String,
});

const scoreSchema1 = new mongoose.Schema({
  teams: String,
  round1: String,
  round2: String,
  round3: String,
});

const matchSchema1 = new mongoose.Schema({
  name: String,
  status: String,
  scores: [scoreSchema1],
  players: [playerSchema1], // Change from 'teamPlayers' to 'players'
});

const Match1 = mongoose.model("Match1", matchSchema1);

module.exports = Match1;
