const express = require("express");
const auth_Football = require('../controllers/auth_Football');
const auth_Vollyball = require("../controllers/auth_Vollyball");
const router = express.Router();

router.post("/admin_login", auth_Football.adminLogin);

// Define routes
router.post("/addMatch", auth_Football.addMatch);
router.get("/getMatches", auth_Football.getMatches);
router.put("/updateMatch/:id", auth_Football.updateMatch);
router.delete("/deleteMatch/:id", auth_Football.deleteMatch);

router.post("/addScores/:id", auth_Football.addScoredetails);
router.get("/getScores/:id", auth_Football.getScoredetails); // New route to get scores
router.put("/updateScoredetails/:scoreId", auth_Football.updateScoredetails);
router.delete("/deleteScoredetails/:scoreId", auth_Football.deleteScoredetails);

router.post("/addPlayers/:matchId", auth_Football.addPlayers);
router.get("/getPlayers/:matchId", auth_Football.getPlayers);
router.put(
  "/updatePlayerDetails/:playerId",
  auth_Football.updatePlayerDetails
);
router.delete(
  "/deletePlayerDetails/:playerId",
  auth_Football.deletePlayerDetails
);



// Define routes
router.post("/addMatch_volly", auth_Vollyball.addMatch);
router.get("/getMatches_volly", auth_Vollyball.getMatches);
router.put("/updateMatch_volly/:id", auth_Vollyball.updateMatch);
router.delete("/deleteMatch_volly/:id", auth_Vollyball.deleteMatch);

router.post("/addScores_volly/:id", auth_Vollyball.addScoredetails);
router.get("/getScores_volly/:id", auth_Vollyball.getScoredetails); // New route to get scores
router.put("/updateScoredetails_volly/:scoreId", auth_Vollyball.updateScoredetails);
router.delete("/deleteScoredetails_volly/:scoreId", auth_Vollyball.deleteScoredetails);

router.post("/addPlayers_volly/:matchId", auth_Vollyball.addPlayers);
router.get("/getPlayers_volly/:matchId", auth_Vollyball.getPlayers);
router.put(
  "/updatePlayerDetails_volly/:playerId",
  auth_Vollyball.updatePlayerDetails
);
router.delete(
  "/deletePlayerDetails_volly/:playerId",
  auth_Vollyball.deletePlayerDetails
);



module.exports = router;

