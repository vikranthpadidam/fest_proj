const mongoose = require("mongoose");
const V_match = require("../models/V_match");


// Controller to add a new match
const addMatch = async (req, res) => {
  try {
    const { name, status } = req.body;
    const newMatch = new V_match({ name, status });
    await newMatch.save();
    res.json(newMatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get all matches
const getMatches = async (req, res) => {
  try {
    const matches = await V_match.find();
    res.json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    // Check if the match exists
    const existingMatch = await V_match.findById(id);
    if (!existingMatch) {
      return res.status(404).json({ error: "Match not found" });
    }

    // Update the match
    existingMatch.name = name;
    existingMatch.status = status;
    const updatedMatch = await existingMatch.save();

    res.json(updatedMatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to delete a match
const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the match exists
    const existingMatch = await V_match.findByIdAndDelete(id);
    if (!existingMatch) {
      console.log(`Match not found with id: ${id}`);
      return res.status(404).json({ error: "Match not found" });
    }

    console.log(`Match deleted successfully with id: ${id}`);
    res.json({ message: "Match deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addScoredetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { teams, round1, round2, round3 } = req.body;

    const match = await V_match.findById(id);

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    const newScore = { teams, round1, round2, round3 };
    match.scores.push(newScore);

    await match.save();

    res.json(newScore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getScoredetails = async (req, res) => {
  try {
    const { id } = req.params;

    const match = await V_match.findById(id);

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    res.json(match.scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateScoredetails = async (req, res) => {
  try {
    const { scoreId } = req.params;
    const { teams, round1, round2, round3 } = req.body;

    // Check if the scoreId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(scoreId)) {
      return res.status(400).json({ message: "Invalid Score ID format" });
    }

    const match = await Match1.findOne({ "scores._id": scoreId });

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    const existingScore = match.scores.find(
      (score) => score._id.toString() === scoreId
    );

    if (!existingScore) {
      return res.status(404).json({ message: "Score not found" });
    }

    // Update the score
    existingScore.teams = teams;
    existingScore.round1 = round1;
    existingScore.round2 = round2;
    existingScore.round3 = round3;

    // Save the updated match
    await match.save();

    res.json(existingScore); // Returning the updated score
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteScoredetails = async (req, res) => {
  const { scoreId } = req.params;
  const { matchId } = req.body;

  try {
    const existingMatch = await V_match.findById(matchId);
    if (!existingMatch) {
      return res.status(404).json({ message: "Match not found" });
    }

    // Filter out the selected score
    existingMatch.scores = existingMatch.scores.filter(
      (score) => score._id.toString() !== scoreId
    );

    await existingMatch.save();

    res.json({ message: "Score deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const addPlayers = async (req, res) => {
  const { matchId } = req.params;
  const { player_name, roll_no, year, team_status } = req.body; // Updated field names

  try {
    const match = await V_match.findById(matchId);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    const newPlayer = {
      player_name,
      roll_no,
      year,
      team_status,
    };

    match.players.push(newPlayer);
    await match.save();

    res.status(201).json(newPlayer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPlayers = async (req, res) => {
  const { matchId } = req.params;
  const { team } = req.query;

  try {
    const match = await V_match.findById(matchId);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    const players = match.players.filter(
      (player) => player.team_status === team
    );

    res.status(200).json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePlayerDetails = async (req, res) => {
  try {
    const { playerId } = req.params;
    const { player_name, roll_no, year, team_status } = req.body;

    // Check if the playerId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(playerId)) {
      return res.status(400).json({ message: "Invalid Player ID format" });
    }

    const existingMatch = await V_match.findOne({ "players._id": playerId });

    if (!existingMatch) {
      return res.status(404).json({ message: "Player not found" });
    }

    const existingPlayer = existingMatch.players.find(
      (player) => player._id.toString() === playerId
    );

    if (!existingPlayer) {
      return res
        .status(404)
        .json({ message: "Player not found in the specified match" });
    }

    // Update player details
    existingPlayer.player_name = player_name;
    existingPlayer.roll_no = roll_no;
    existingPlayer.year = year;

    if (team_status) {
      existingPlayer.team_status = team_status;
    }

    await existingMatch.save();

    res.json(existingPlayer); // Returning the updated player details
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete player details
const deletePlayerDetails = async (req, res) => {
  const { playerId } = req.params;

  try {
    const existingMatch = await V_match.findOne({ "players._id": playerId });
    if (!existingMatch) {
      return res.status(404).json({ message: "Player not found" });
    }

    existingMatch.players = existingMatch.players.filter(
      (player) => player._id.toString() !== playerId
    );

    const updatedMatch = await existingMatch.save();

    res.json({ message: "Player details deleted successfully", updatedMatch });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  addMatch,
  getMatches,
  updateMatch,
  deleteMatch,

  addScoredetails,
  getScoredetails,
  updateScoredetails,
  deleteScoredetails,

  addPlayers,
  getPlayers,
  updatePlayerDetails,
  deletePlayerDetails,
};