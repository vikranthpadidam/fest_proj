const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin", // Set a default role if needed
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
