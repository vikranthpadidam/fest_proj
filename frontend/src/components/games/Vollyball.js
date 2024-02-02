// src/Volleyball.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Volleyball = () => {
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [year, setYear] = useState("");
  const [editPlayerId, setEditPlayerId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData("team1");
    fetchData("team2");
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

  const toggleForm = () => {
    setShowForm(!showForm);
    clearForm();
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
      clearForm();
    } catch (error) {
      console.error("Error adding/editing player:", error.message);
    }
  };

  const deletePlayer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/players/${id}`);
      fetchData("team1");
      fetchData("team2");
      clearForm();
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

  const clearForm = () => {
    setName("");
    setRoll("");
    setYear("");
    setEditPlayerId(null);
  };

  return (
    <div className="container mt-4">
      <div className="row ">
        <div className="col">
          <h1 className="mb-4">Players Details</h1>
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
            {editPlayerId ? "Update" : "Add"} Team1
          </button>
          <button
            className="btn btn-success mb-3"
            onClick={() => addOrUpdatePlayer("team2")}
          >
            {editPlayerId ? "Update" : "Add"} Team2
          </button>
          {editPlayerId && (
            <button
              className="btn btn-danger mb-3"
              onClick={() => deletePlayer(editPlayerId)}
            >
              Delete
            </button>
          )}
          <button className="btn btn-secondary mb-3" onClick={clearForm}>
            Clear
          </button>
        </div>
      )}

      <div className="d-flex justify-content-between">
        <div>
          <h2>Team 1 Players</h2>
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
          <h2>Team 2 Players</h2>
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
  );
};

export default Volleyball;
