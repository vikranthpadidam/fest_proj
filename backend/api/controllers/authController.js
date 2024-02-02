const mongoose = require("mongoose");
const Admin = require("../models/adminModel");
const Match = require("../models/match");

require("dotenv").config();

const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const admin = await Admin.findOne({ userId });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    if (password === admin.password) {
      // Create a JWT token
      const token = jwt.sign(
        {
          userId: admin.userId,
          role: admin.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Set the expiration time
      );
      console.log(token); //generating token
      res.json({ message: "Admin login successful", role: "admin" });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// // Get Team 1 Players
// const getTeam1Players = async (req, res) => {
//   try {
//     const players = await Player.find({ team: "team1" });
//     res.json(players);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Team 2 Players
// const getTeam2Players = async (req, res) => {
//   try {
//     const players = await Player.find({ team: "team2" });
//     res.json(players);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Add Team 1 Player
// const addTeam1Player = async (req, res) => {
//   const player = new Player({
//     name: req.body.name,
//     roll: req.body.roll,
//     year: req.body.year,
//     team: "team1",
//   });

//   try {
//     const newPlayer = await player.save();
//     res.status(201).json(newPlayer);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Add Team 2 Player
// const addTeam2Player = async (req, res) => {
//   const player = new Player({
//     name: req.body.name,
//     roll: req.body.roll,
//     year: req.body.year,
//     team: "team2",
//   });

//   try {
//     const newPlayer = await player.save();
//     res.status(201).json(newPlayer);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Edit Player
// const editPlayer = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const player = await Player.findByIdAndUpdate(id, req.body, { new: true });
//     res.json(player);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const deletePlayer = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const player = await Player.findByIdAndDelete(id);

//     if (!player) {
//       return res.status(404).json({ message: "Player not found" });
//     }

//     res.json({ message: "Player deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const addScore = async (req, res) => {
//   try {
//     const { team, round1, round2, round3 } = req.body;
//     const newScore = new Score({ team, round1, round2, round3 });
//     const savedScore = await newScore.save();
//     res.json(savedScore);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const updateScore = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { team, round1, round2, round3 } = req.body;
//     const updatedScore = await Score.findByIdAndUpdate(
//       id,
//       { team, round1, round2, round3 },
//       { new: true }
//     );
//     res.json(updatedScore);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const fetchScores = async (req, res) => {
//   try {
//     const scores = await Score.find();
//     res.json(scores);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const deleteScore = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Score.findByIdAndDelete(id);
//     res.json({ message: "Score deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Controller to add a new match
const addMatch = async (req, res) => {
  try {
    const { name, status } = req.body;
    const newMatch = new Match({ name, status });
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
    const matches = await Match.find();
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
    const existingMatch = await Match.findById(id);
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
    const existingMatch = await Match.findByIdAndDelete(id);
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

    const match = await Match.findById(id);

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

    const match = await Match.findById(id);

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

    const match = await Match.findOne({ "scores._id": scoreId });

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
    const existingMatch = await Match.findById(matchId);
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
    const match = await Match.findById(matchId);

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
    const match = await Match.findById(matchId);

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

    const existingMatch = await Match.findOne({ "players._id": playerId });

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
    const existingMatch = await Match.findOne({ "players._id": playerId });
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
  adminLogin,

  // getTeam1Players,
  // getTeam2Players,
  // addTeam1Player,
  // addTeam2Player,
  // editPlayer,
  // deletePlayer,

  // addScore,
  // updateScore,
  // deleteScore,
  // fetchScores,

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
