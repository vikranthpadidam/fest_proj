// src/Game.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Badminton = () => {
  // Players State
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [year, setYear] = useState("");
  const [editPlayerId, setEditPlayerId] = useState(null);
  const [showPlayerForm, setShowPlayerForm] = useState(false);

  // Scores State
  const [team, setTeam] = useState("");
  const [round1, setRound1] = useState("");
  const [round2, setRound2] = useState("");
  const [round3, setRound3] = useState("");
  const [scoreboard, setScoreboard] = useState([]);
  const [selectedScore, setSelectedScore] = useState(null);
  const [showScoreForm, setShowScoreForm] = useState(false);

  useEffect(() => {
    fetchData("team1");
    fetchData("team2");
    fetchScores();
  }, []);

  const fetchData = async (team) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/players/${team}`
      );

      if (team === "team1") {
        setTeam1Players(response.data);
      } else {
        setTeam2Players(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const fetchScores = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/scores");
      setScoreboard(response.data);
    } catch (error) {
      console.error("Error fetching scores:", error.message);
    }
  };

  // Players functions
  const togglePlayerForm = () => {
    setShowPlayerForm(!showPlayerForm);
    clearPlayerForm();
  };

  const addOrUpdatePlayer = async (team) => {
    try {
      if (editPlayerId) {
        // Update existing player
        await axios.put(
          `http://localhost:5000/api/auth/players/${editPlayerId}`,
          { name, roll, year, team }
        );
        setEditPlayerId(null);
      } else {
        // Add new player
        await axios.post(`http://localhost:5000/api/auth/players/${team}`, {
          name,
          roll,
          year,
        });
      }
      fetchData("team1");
      fetchData("team2");
      clearPlayerForm();
    } catch (error) {
      console.error("Error adding/editing player:", error.message);
    }
  };

  const deletePlayer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/players/${id}`);
      fetchData("team1");
      fetchData("team2");
      clearPlayerForm();
    } catch (error) {
      console.error("Error deleting player:", error.message);
    }
  };

  const handlePlayerClick = (id, playerName, playerRoll, playerYear) => {
    setEditPlayerId(id);
    setName(playerName);
    setRoll(playerRoll);
    setYear(playerYear);
  };

  const clearPlayerForm = () => {
    setName("");
    setRoll("");
    setYear("");
    setEditPlayerId(null);
  };

  // Scores functions
  const toggleScoreForm = () => {
    setShowScoreForm(!showScoreForm);
    clearScoreForm();
  };

  const addScore = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/scores",
        {
          team,
          round1,
          round2,
          round3,
        }
      );
      setScoreboard([...scoreboard, response.data]);
      clearScoreForm();
    } catch (error) {
      console.error("Error adding score:", error.message);
    }
  };

  const updateScore = async () => {
    if (!selectedScore) {
      console.error("No score selected for update");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/scores/${selectedScore._id}`,
        {
          team,
          round1,
          round2,
          round3,
        }
      );
      const updatedScoreboard = scoreboard.map((score) =>
        score._id === response.data._id ? response.data : score
      );
      setScoreboard(updatedScoreboard);
      clearScoreForm();
    } catch (error) {
      console.error("Error updating score:", error.message);
    }
  };

  const deleteScore = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/scores/${id}`);
      const updatedScoreboard = scoreboard.filter((score) => score._id !== id);
      setScoreboard(updatedScoreboard);
      clearScoreForm();
    } catch (error) {
      console.error("Error deleting score:", error.message);
    }
  };

  const handleScoreClick = (score) => {
    setTeam(score.team);
    setRound1(score.round1);
    setRound2(score.round2);
    setRound3(score.round3);
    setSelectedScore(score);
  };

  const clearScoreForm = () => {
    setTeam("");
    setRound1("");
    setRound2("");
    setRound3("");
    setSelectedScore(null);
  };

  return (
    <div className="container mt-4">
      <div className="row ">
        <div className="col">
          <h1 className="mb-4">Game Details</h1>
        </div>
      </div>

      {/* Players Section */}
      <div>
        <div className="row">
          <div className="col">
            <h2>Players Details</h2>
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" onClick={togglePlayerForm}>
              {showPlayerForm ? "Hide" : "Add Player"}
            </button>
          </div>
        </div>

        {showPlayerForm && (
          <div>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Roll:</label>
              <input
                type="text"
                className="form-control"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Year:</label>
              <input
                type="text"
                className="form-control"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <button
              className="btn btn-success mb-3 me-2"
              onClick={() => addOrUpdatePlayer("team1")}
            >
              {editPlayerId ? "Update" : "Add"} Team1 Player
            </button>
            <button
              className="btn btn-success mb-3"
              onClick={() => addOrUpdatePlayer("team2")}
            >
              {editPlayerId ? "Update" : "Add"} Team2 Player
            </button>
            {editPlayerId && (
              <button
                className="btn btn-danger mb-3"
                onClick={() => deletePlayer(editPlayerId)}
              >
                Delete
              </button>
            )}
            <button
              className="btn btn-secondary mb-3"
              onClick={clearPlayerForm}
            >
              Clear
            </button>
          </div>
        )}

        <div className="d-flex justify-content-between">
          <div>
            <h3>Team 1 Players</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Roll</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {team1Players.map((player, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      handlePlayerClick(
                        player._id,
                        player.name,
                        player.roll,
                        player.year
                      )
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{player.name}</td>
                    <td>{player.roll}</td>
                    <td>{player.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3>Team 2 Players</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Roll</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {team2Players.map((player, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      handlePlayerClick(
                        player._id,
                        player.name,
                        player.roll,
                        player.year
                      )
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{player.name}</td>
                    <td>{player.roll}</td>
                    <td>{player.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Scores Section */}
      <div className="mt-5">
        <div className="row">
          <div className="col">
            <h2>Score Details</h2>
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" onClick={toggleScoreForm}>
              {showScoreForm ? "Hide" : "Add Score"}
            </button>
          </div>
        </div>

        {showScoreForm && (
          <div>
            <div className="mb-3">
              <label className="form-label">Team:</label>
              <input
                type="text"
                className="form-control"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Round 1:</label>
              <input
                type="text"
                className="form-control"
                value={round1}
                onChange={(e) => setRound1(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Round 2:</label>
              <input
                type="text"
                className="form-control"
                value={round2}
                onChange={(e) => setRound2(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Round 3:</label>
              <input
                type="text"
                className="form-control"
                value={round3}
                onChange={(e) => setRound3(e.target.value)}
              />
            </div>
            <button className="btn btn-success mb-3 me-2" onClick={addScore}>
              Add Score
            </button>
            <button className="btn btn-success mb-3" onClick={updateScore}>
              Update Score
            </button>
            {selectedScore && (
              <button
                className="btn btn-danger mb-3"
                onClick={() => deleteScore(selectedScore._id)}
              >
                Delete
              </button>
            )}
            <button className="btn btn-secondary mb-3" onClick={clearScoreForm}>
              Clear
            </button>
          </div>
        )}

        <table className="table">
          <thead>
            <tr>
              <th>Teams</th>
              <th>Round 1</th>
              <th>Round 2</th>
              <th>Round 3</th>
            </tr>
          </thead>
          <tbody>
            {scoreboard.map((score, index) => (
              <tr key={index} onClick={() => handleScoreClick(score)}>
                <td>{score.team}</td>
                <td>{score.round1}</td>
                <td>{score.round2}</td>
                <td>{score.round3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Badminton;
