const express = require("express");
const authControllers = require('../controllers/authController');
const router = express.Router();

router.post("/admin_login", authControllers.adminLogin);

// Define routes
router.post("/addMatch", authControllers.addMatch);
router.get("/getMatches", authControllers.getMatches);
router.put("/updateMatch/:id", authControllers.updateMatch);
router.delete("/deleteMatch/:id", authControllers.deleteMatch);

router.post("/addScores/:id", authControllers.addScoredetails);
router.get("/getScores/:id", authControllers.getScoredetails); // New route to get scores
router.put("/updateScoredetails/:scoreId", authControllers.updateScoredetails);
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


// Define routes
router.post("/addMatch_volly", authControllers.addMatch);
router.get("/getMatches_volly", authControllers.getMatches);
router.put("/updateMatch_volly/:id", authControllers.updateMatch);
router.delete("/deleteMatch_volly/:id", authControllers.deleteMatch);

router.post("/addScores_volly/:id", authControllers.addScoredetails_volly);
router.get("/getScores_volly/:id", authControllers.getScoredetails_volly); // New route to get scores
router.put(
  "/updateScoredetails_volly/:scoreId",
  authControllers.updateScoredetails_volly
);
router.delete(
  "/deleteScoredetails_volly/:scoreId",
  authControllers.deleteScoredetails_volly
);


router.post("/addPlayers_volly/:matchId", authControllers.addPlayers_volly);
router.get("/getPlayers_volly/:matchId", authControllers.getPlayers_volly);
router.put(
  "/updatePlayerDetails_volly/:playerId",
  authControllers.updatePlayerDetails_volly
);
router.delete(
  "/deletePlayerDetails_volly/:playerId",
  authControllers.deletePlayerDetails_volly
);


module.exports = router;

