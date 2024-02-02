// authModels.js
const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  team: { type: String, required: true },
  round1: { type: String, required: true },
  round2: { type: String, required: true },
  round3: { type: String, required: true },
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
