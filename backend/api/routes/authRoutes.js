const express = require("express");
const authControllers = require('../controllers/authController');
const router = express.Router();

router.post("/admin_login", authControllers.adminLogin);
// Routes for Team 1 Players
// router.get("/players/team1", authControllers.getTeam1Players);
// router.post("/players/team1", authControllers.addTeam1Player);
// router.put("/players/:id", authControllers.editPlayer);
// router.delete("/players/:id", authControllers.deletePlayer);

// // Routes for Team 2 Players
// router.get("/players/team2", authControllers.getTeam2Players);
// router.post("/players/team2", authControllers.addTeam2Player);


// router.post("/scores", authControllers.addScore);
// router.put("/scores/:id", authControllers.updateScore);
// router.delete("/scores/:id", authControllers.deleteScore);
// router.get("/scores", authControllers.fetchScores);

// Define routes
router.post("/addMatch", authControllers.addMatch);
router.get("/getMatches", authControllers.getMatches);
router.put("/updateMatch/:id", authControllers.updateMatch);
router.delete("/deleteMatch/:id", authControllers.deleteMatch);

router.post("/addScores/:id", authControllers.addScoredetails);
router.get("/getScores/:id", authControllers.getScoredetails); // New route to get scores
router.put("/updateScoredetails/:scoreId", authControllers.updateScoredetails);
// Example in your backend code
router.delete("/deleteScoredetails/:scoreId", authControllers.deleteScoredetails);


router.post("/addPlayers/:matchId", authControllers.addPlayers);
router.get("/getPlayers/:matchId", authControllers.getPlayers);
router.put(
  "/updatePlayerDetails/:playerId",
  authControllers.updatePlayerDetails
);
router.delete(
  "/deletePlayerDetails/:playerId",
  authControllers.deletePlayerDetails
);


module.exports = router;