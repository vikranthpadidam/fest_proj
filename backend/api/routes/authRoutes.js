const express = require("express");

const auth_Football = require("../controllers/auth_Football");
const auth_Vollyball = require("../controllers/auth_Vollyball");
const authStatistics = require("../controllers/authStatistics");
const auth_Admin = require("../controllers/auth_AdminLogin");
const auth_Carroms = require("../controllers/auth_Carroms");
const auth_Badmintain = require("../controllers/auth_Badminton");
const auth_Basketball = require("../controllers/auth_Basketball");
const auth_Chess = require("../controllers/auth_Chess");
const auth_Kabbadi = require("../controllers/auth_Kabbadi");
const auth_TT = require("../controllers/auth_Tabletennis");
const auth_TW = require("../controllers/auth_Throwball");
const auth_Crk = require("../controllers/auth_Cricket");
const auth_Winner = require("../controllers/auth_Winner");
const auth_Livematche = require('../controllers/auth_Livematche');
const multer = require("multer");
// Configure multer for handling file uploads
const storage = multer.memoryStorage(); // Use memory storage for FormData
const upload = multer({ storage: storage });


const router = express.Router();



router.post("/admin_login", auth_Admin.adminLogin);
// Get sports item by name
router.get("/sportsItems/name/:itemName", auth_Winner.getSportsItemByName);



//Get the sports byID
router.get("/sportsItems/:itemId", auth_Winner.getSportsItemById);
// Add a new sports item
// router.post("/sportsItems", authControllers.addSportsItem);
router.post("/sportsItems", upload.single("image"), auth_Winner.addSportsItem);
// Get all sports items
router.get("/sportsItems", auth_Winner.getAllSportsItems);
router.delete("/sportsItems/:itemId", auth_Winner.deleteSportsItem);


//Get the sports byID
router.get("/sportsItems_live/:itemId", auth_Livematche.getSportsItemById);
// Add a new sports item
// router.post("/sportsItems", authControllers.addSportsItem);
router.post(
  "/sportsItems_live",
  upload.single("image"),
  auth_Livematche.addSportsItem
);
// Get all sports items
router.get("/sportsItems_live", auth_Livematche.getAllSportsItems);
router.delete("/sportsItems_live/:itemId", auth_Livematche.deleteSportsItem);

/////////////////////////////////////////////////////////////////////////////////////////////////////////FOOTBALL
router.post("/addMatch", auth_Football.addMatch);
router.get("/getMatches", auth_Football.getMatches);
router.put("/updateMatch/:id", auth_Football.updateMatch);
router.delete("/deleteMatch/:id", auth_Football.deleteMatch);
router.post("/addScores/:id", auth_Football.addScoredetails);
router.get("/getScores/:id", auth_Football.getScoredetails); // New route to get scores
router.put(
  "/updateScoredetails/:matchId/:scoreId",
  auth_Football.updateScoredetails
);
router.delete(
  "/deleteScoredetails/:scoreId/:matchId",
  auth_Football.deleteScoredetails
);
router.post("/addPlayers/:matchId", auth_Football.addPlayers);
router.get("/getPlayers/:matchId", auth_Football.getPlayers);
router.put(
  "/updatePlayerDetails/:matchId/:playerId",
  auth_Football.updatePlayerDetails
);
router.delete(
  "/deletePlayerDetails/:playerId/:matchId",
  auth_Football.deletePlayerDetails
);
///////////////////////////////////////////////////////////////////////////////////////////////////////CARROMS
router.post("/addMatch_carroms", auth_Carroms.addMatch);
router.get("/getMatches_carroms", auth_Carroms.getMatches);
router.put("/updateMatch_carroms/:id", auth_Carroms.updateMatch);
router.delete("/deleteMatch_carroms/:id", auth_Carroms.deleteMatch);
router.post("/addScores_carroms/:id", auth_Carroms.addScoredetails);
router.get("/getScores_carroms/:id", auth_Carroms.getScoredetails); // New route to get scores
router.put(
  "/updateScoredetails_carroms/:matchId/:scoreId",
  auth_Carroms.updateScoredetails
);
router.delete(
  "/deleteScoredetails_carroms/:scoreId/:matchId",
  auth_Carroms.deleteScoredetails
);
router.post("/addPlayers_carroms/:matchId", auth_Carroms.addPlayers);
router.get("/getPlayers_carroms/:matchId", auth_Carroms.getPlayers);
router.put(
  "/updatePlayerDetails_carroms/:matchId/:playerId",
  auth_Carroms.updatePlayerDetails
);
router.delete(
  "/deletePlayerDetails_carroms/:playerId/:matchId",
  auth_Carroms.deletePlayerDetails
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////BADMINTON
router.post("/addMatch_Bad", auth_Badmintain.addMatch);
router.get("/getMatches_Bad", auth_Badmintain.getMatches);
router.put("/updateMatch_Bad/:id", auth_Badmintain.updateMatch);
router.delete("/deleteMatch_Bad/:id", auth_Badmintain.deleteMatch);
router.post("/addScores_Bad/:id", auth_Badmintain.addScoredetails);
router.get("/getScores_Bad/:id", auth_Badmintain.getScoredetails); // New route to get scores
router.put(
  "/updateScoredetails_Bad/:matchId/:scoreId",
  auth_Badmintain.updateScoredetails
);
router.delete(
  "/deleteScoredetails_Bad/:scoreId/:matchId",
  auth_Badmintain.deleteScoredetails
);
router.post("/addPlayers_Bad/:matchId", auth_Badmintain.addPlayers);
router.get("/getPlayers_Bad/:matchId", auth_Badmintain.getPlayers);
router.put(
  "/updatePlayerDetails_Bad/:matchId/:playerId",
  auth_Badmintain.updatePlayerDetails
);
router.delete(
  "/deletePlayerDetails_Bad/:playerId/:matchId",
  auth_Badmintain.deletePlayerDetails
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////VOLLYBALL
router.post("/addMatch_volly", auth_Vollyball.addMatch);
router.get("/getMatches_volly", auth_Vollyball.getMatches);
router.put("/updateMatch_volly/:id", auth_Vollyball.updateMatch);
router.delete("/deleteMatch_volly/:id", auth_Vollyball.deleteMatch);

router.post("/addScores_volly/:id", auth_Vollyball.addScoredetails);
router.get("/getScores_volly/:id", auth_Vollyball.getScoredetails); // New route to get scores
router.put(
  "/updateScoredetails_volly/:matchId/:scoreId",
  auth_Vollyball.updateScoredetails
);
router.delete(
  "/deleteScoredetails_volly/:scoreId/:matchId",
  auth_Vollyball.deleteScoredetails
);
router.post("/addPlayers_volly/:matchId", auth_Vollyball.addPlayers);
router.get("/getPlayers_volly/:matchId", auth_Vollyball.getPlayers);
router.put(
  "/updatePlayerDetails_volly/:matchId/:playerId",
  auth_Vollyball.updatePlayerDetails
);
router.delete(
  "/deletePlayerDetails_volly/:playerId/:matchId",
  auth_Vollyball.deletePlayerDetails
);
///////////////////////////////////////////////////////////////////////////////////////////////////////BASKETBALL
router.post("/addMatch_bask", auth_Basketball.addMatch);
router.get("/getMatches_bask", auth_Basketball.getMatches);
router.put("/updateMatch_bask/:id", auth_Basketball.updateMatch);
router.delete("/deleteMatch_bask/:id", auth_Basketball.deleteMatch);
router.post("/addScores_bask/:id", auth_Basketball.addScoredetails);
router.get("/getScores_bask/:id", auth_Basketball.getScoredetails); // New route to get scores
router.put(
  "/updateScoredetails_bask/:matchId/:scoreId",
  auth_Basketball.updateScoredetails
);
router.delete(
  "/deleteScoredetails_bask/:scoreId/:matchId",
  auth_Basketball.deleteScoredetails
);
router.post("/addPlayers_bask/:matchId", auth_Basketball.addPlayers);
router.get("/getPlayers_bask/:matchId", auth_Basketball.getPlayers);
router.put(
  "/updatePlayerDetails_bask/:matchId/:playerId",
  auth_Basketball.updatePlayerDetails
);
router.delete(
  "/deletePlayerDetails_bask/:playerId/:matchId",
  auth_Basketball.deletePlayerDetails
);
///////////////////////////////////////////////////////////////////////////////////////////////////////CHESSSS
router.post("/addMatch_chess", auth_Chess.addMatch);
router.get("/getMatches_chess", auth_Chess.getMatches);
router.put("/updateMatch_chess/:id", auth_Chess.updateMatch);
router.delete("/deleteMatch_chess/:id", auth_Chess.deleteMatch);
router.post("/addScores_chess/:id", auth_Chess.addScoredetails);
router.get("/getScores_chess/:id", auth_Chess.getScoredetails); // New route to get scores
router.put(
  "/updateScoredetails_chess/:matchId/:scoreId",
  auth_Chess.updateScoredetails
);
router.delete(
  "/deleteScoredetails_chess/:scoreId/:matchId",
  auth_Chess.deleteScoredetails
);
router.post("/addPlayers_chess/:matchId", auth_Chess.addPlayers);
router.get("/getPlayers_chess/:matchId", auth_Chess.getPlayers);
router.put(
  "/updatePlayerDetails_chess/:matchId/:playerId",
  auth_Chess.updatePlayerDetails
);
router.delete(
  "/deletePlayerDetails_chess/:playerId/:matchId",
  auth_Chess.deletePlayerDetails
);
///////////////////////////////////////////////////////////////////////////////////////////////////////KABADDI
router.post("/addMatch_kab", auth_Kabbadi.addMatch);
router.get("/getMatches_kab", auth_Kabbadi.getMatches);
router.put("/updateMatch_kab/:id", auth_Kabbadi.updateMatch);
router.delete("/deleteMatch_kab/:id", auth_Kabbadi.deleteMatch);
router.post("/addScores_kab/:id", auth_Kabbadi.addScoredetails);
router.get("/getScores_kab/:id", auth_Kabbadi.getScoredetails); // New route to get scores
router.put(
  "/updateScoredetails_kab/:matchId/:scoreId",
  auth_Kabbadi.updateScoredetails
);
router.delete(
  "/deleteScoredetails_kab/:scoreId/:matchId",
  auth_Kabbadi.deleteScoredetails
);
router.post("/addPlayers_kab/:matchId", auth_Kabbadi.addPlayers);
router.get("/getPlayers_kab/:matchId", auth_Kabbadi.getPlayers);
router.put(
  "/updatePlayerDetails_kab/:matchId/:playerId",
  auth_Kabbadi.updatePlayerDetails
);
router.delete(
  "/deletePlayerDetails_kab/:playerId/:matchId",
  auth_Kabbadi.deletePlayerDetails
);
///////////////////////////////////////////////////////////////////////////////////////////////////////TABLETENNIS(TT)

router.post("/addMatch_tt", auth_TT.addMatch);
router.get("/getMatches_tt", auth_TT.getMatches);
router.put("/updateMatch_tt/:id", auth_TT.updateMatch);
router.delete("/deleteMatch_tt/:id", auth_TT.deleteMatch);
router.post("/addScores_tt/:id", auth_TT.addScoredetails);
router.get("/getScores_tt/:id", auth_TT.getScoredetails); // New route to get scores
router.put(
  "/updateScoredetails_tt/:matchId/:scoreId",
  auth_TT.updateScoredetails
);
router.delete(
  "/deleteScoredetails_tt/:scoreId/:matchId",
  auth_TT.deleteScoredetails
);
router.post("/addPlayers_tt/:matchId", auth_TT.addPlayers);
router.get("/getPlayers_tt/:matchId", auth_TT.getPlayers);
router.put(
  "/updatePlayerDetails_tt/:matchId/:playerId",
  auth_TT.updatePlayerDetails
);
router.delete(
  "/deletePlayerDetails_tt/:playerId/:matchId",
  auth_TT.deletePlayerDetails
);
///////////////////////////////////////////////////////////////////////////////////////////////////////THROWBALL
router.post("/addMatch_tw", auth_TW.addMatch);
router.get("/getMatches_tw", auth_TW.getMatches);
router.put("/updateMatch_tw/:id", auth_TW.updateMatch);
router.delete("/deleteMatch_tw/:id", auth_TW.deleteMatch);

router.post("/addScores_tw/:id", auth_TW.addScoredetails);
router.get("/getScores_tw/:id", auth_TW.getScoredetails); // New route to get scores
router.put(
  "/updateScoredetails_tw/:matchId/:scoreId",
  auth_TW.updateScoredetails
);
router.delete(
  "/deleteScoredetails_tw/:scoreId/:matchId",
  auth_TW.deleteScoredetails
);
router.post("/addPlayers_tw/:matchId", auth_TW.addPlayers);
router.get("/getPlayers_tw/:matchId", auth_TW.getPlayers);
router.put(
  "/updatePlayerDetails_tw/:matchId/:playerId",
  auth_TW.updatePlayerDetails
);
router.delete(
  "/deletePlayerDetails_tw/:playerId/:matchId",
  auth_TW.deletePlayerDetails
);

///////////////////////////////////////////////////////////////////////////////////////////////////////CRICKET(CRK)
router.post("/addMatch_crk", auth_Crk.addMatch);
router.get("/getMatches_crk", auth_Crk.getMatches);
router.put("/updateMatch_crk/:id", auth_Crk.updateMatch);
router.delete("/deleteMatch_crk/:id", auth_Crk.deleteMatch);
router.post("/addScores_crk/:id", auth_Crk.addScoredetails);
router.get("/getScores_crk/:id", auth_Crk.getScoredetails); // New route to get scores
router.put(
  "/updateScoredetails_crk/:matchId/:scoreId",
  auth_Crk.updateScoredetails
);
router.delete(
  "/deleteScoredetails_crk/:scoreId/:matchId",
  auth_Crk.deleteScoredetails
);
router.post("/addPlayers_crk/:matchId", auth_Crk.addPlayers);
router.get("/getPlayers_crk/:matchId", auth_Crk.getPlayers);
router.put(
  "/updatePlayerDetails_crk/:matchId/:playerId",
  auth_Crk.updatePlayerDetails
);
router.delete(
  "/deletePlayerDetails_crk/:playerId/:matchId",
  auth_Crk.deletePlayerDetails
);

router.get("/getAllStatistics", authStatistics.getAllStatistics);
router.post("/addStatistic", authStatistics.addStatistic);
router.put("/updateStatistic/:id", authStatistics.updateStatistic);
router.delete("/deleteStatistic/:id", authStatistics.deleteStatistic);

module.exports = router;
