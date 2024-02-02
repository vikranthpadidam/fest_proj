const express = require("express");
const authControllers = require('../controllers/authController');
const authControllers1 = require("../controllers/authControllers1");
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
router.post("/addMatch_volly", authControllers1.addMatch);
router.get("/getMatches_volly", authControllers1.getMatches);
router.put("/updateMatch_volly/:id", authControllers1.updateMatch);
router.delete("/deleteMatch_volly/:id", authControllers1.deleteMatch);

router.post("/addScores_volly/:id", authControllers1.addScoredetails);
router.get("/getScores_volly/:id", authControllers1.getScoredetails); // New route to get scores
router.put(
  "/updateScoredetails_volly/:scoreId",
  authControllers1.updateScoredetails
);
router.delete(
  "/deleteScoredetails_volly/:scoreId",
  authControllers1.deleteScoredetails
);


router.post("/addPlayers_volly/:matchId", authControllers1.addPlayers);
router.get("/getPlayers_volly/:matchId", authControllers1.getPlayers);
router.put(
  "/updatePlayerDetails_volly/:playerId",
  authControllers1.updatePlayerDetails
);
router.delete(
  "/deletePlayerDetails_volly/:playerId",
  authControllers1.deletePlayerDetails
);


module.exports = router;

