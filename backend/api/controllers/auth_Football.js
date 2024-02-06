const mongoose = require("mongoose");
const F_m = require("../models/F_m");



// Controller to add a new match
const addMatch = async (req, res) => {
  try {
    const { name, status, gender } = req.body;
    const newMatch = new F_m({ name, status, gender });
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
    const matches = await F_m.find();
    res.json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, gender } = req.body;

    // Check if the match exists
    const existingMatch = await F_m.findById(id);
    if (!existingMatch) {
      return res.status(404).json({ error: "Match not found" });
    }

    // Update the match
    existingMatch.name = name;
    existingMatch.status = status;
    existingMatch.gender = gender;
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
    const existingMatch = await F_m.findByIdAndDelete(id);
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
    const { teams, round1 } = req.body;

    const match = await F_m.findById(id);

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    const newScore = { teams, round1 };
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

    const match = await F_m.findById(id);

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    res.json(match.scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update score details
const updateScoredetails = async (req, res) => {
  try {
    const { matchId, scoreId } = req.params;
    const { teams, round1 } = req.body;

    // Check if the matchId and scoreId are valid ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(matchId) ||
      !mongoose.Types.ObjectId.isValid(scoreId)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid Match or Score ID format" });
    }

    const match = await F_m.findById(matchId);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    // Check if the scoreId exists in the match's scores array
    const existingScore = match.scores.id(scoreId);

    if (!existingScore) {
      return res.status(404).json({ message: "Score not found" });
    }

    // Update the score
    existingScore.teams = teams;
    existingScore.round1 = round1;

    // Save the updated match
    await match.save();

    // Fetch the updated score to ensure all data is populated
    const updatedScore = match.scores.id(scoreId);

    res.json(updatedScore); // Returning the updated score
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete score details
const deleteScoredetails = async (req, res) => {
  const { scoreId, matchId } = req.params;

  try {
    const existingMatch = await F_m.findById(matchId);
    if (!existingMatch) {
      return res.status(404).json({ message: "Match not found" });
    }

    const existingScore = existingMatch.scores.id(scoreId);

    if (!existingScore) {
      return res.status(404).json({ message: "Score not found" });
    }

    // Remove the selected score
    existingScore.deleteOne();
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
    const match = await F_m.findById(matchId);

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
    const match = await F_m.findById(matchId);

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
  const { playerId, matchId } = req.params;
  const { player_name, roll_no, year, team_status } = req.body;

  try {
    const match = await F_m.findById(matchId);

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    // Find and update the player in the players array
    const updatedPlayers = match.players.map((player) => {
      if (player._id.toString() === playerId) {
        player.player_name = player_name;
        player.roll_no = roll_no;
        player.year = year;
        player.team_status = team_status;
      }
      return player;
    });

    match.players = updatedPlayers;
    await match.save();

    res
      .status(200)
      .json(match.players.find((player) => player._id.toString() === playerId));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete player details
const deletePlayerDetails = async (req, res) => {
  const { playerId, matchId } = req.params;

  try {
    const match = await F_m.findById(matchId);

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    // Find and remove the player from the players array
    const updatedPlayers = match.players.filter(
      (player) => player._id.toString() !== playerId
    );

    match.players = updatedPlayers;
    await match.save();

    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ------------------------------------------------------------------------------------------------------------------------

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
