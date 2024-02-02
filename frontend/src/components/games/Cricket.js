// Vollyball.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Cricket = () => {
  const [team, setTeam] = useState("");
  const [round1, setRound1] = useState("");
  const [round2, setRound2] = useState("");
  const [round3, setRound3] = useState("");
  const [scoreboard, setScoreboard] = useState([]);
  const [selectedScore, setSelectedScore] = useState(null);
   const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchScores();
  }, []); // Fetch scores on component mount

  const toggleForm = () => {
    setShowForm(!showForm);
    clearForm();
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
      clearForm();
    } catch (error) {
      console.error("Error adding score:", error);
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
      clearForm();
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  const deleteScore = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/scores/${id}`);
      const updatedScoreboard = scoreboard.filter((score) => score._id !== id);
      setScoreboard(updatedScoreboard);
      clearForm();
    } catch (error) {
      console.error("Error deleting score:", error);
    }
  };

  const fetchScores = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/scores");
      setScoreboard(response.data);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  const handleScoreClick = (score) => {
    setTeam(score.team);
    setRound1(score.round1);
    setRound2(score.round2);
    setRound3(score.round3);
    setSelectedScore(score);
  };

  const clearForm = () => {
    setTeam("");
    setRound1("");
    setRound2("");
    setRound3("");
    setSelectedScore(null);
  };

  return (
    <div>
      <div className="row ">
        <div className="col">
          <h1 className="mb-4">Score Details</h1>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={toggleForm}>
            {showForm ? "Hide" : "Add"}
          </button>
        </div>
      </div>

      {showForm && (
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
            Add
          </button>
          <button className="btn btn-success mb-3" onClick={updateScore}>
            Update
          </button>
          {selectedScore && (
            <button
              className="btn btn-danger mb-3"
              onClick={() => deleteScore(selectedScore._id)}
            >
              Delete
            </button>
          )}
          <button className="btn btn-secondary mb-3" onClick={clearForm}>
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
      <button type="button" onClick={fetchScores}>
        Refresh Scores
      </button>
    </div>
  );
};

export default Cricket;
