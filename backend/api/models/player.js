const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roll: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Player", playerSchema);
