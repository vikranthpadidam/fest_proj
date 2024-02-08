import React, { useState, useEffect } from "react";
import axios from "axios";

const Carroms = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState({ name: "", status: "future" });
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAddScoreFormVisible, setIsAddScoreFormVisible] = useState(false);

  const [scoreFormData, setScoreFormData] = useState({
    teams: "",
    round1: "",
  });
  const [scores, setScores] = useState([]);

  const [isAddPlayerFormVisible, setIsAddPlayerFormVisible] = useState(false);
  const [playerFormData, setPlayerFormData] = useState({
    player_name: "",
    rollNo: "",
    year: "",
    team_status: "TeamA",
  });

  const [playersTeamA, setPlayersTeamA] = useState([]);
  const [playersTeamB, setPlayersTeamB] = useState([]);

  const [selectedScoreDetails, setSelectedScoreDetails] = useState(null);
  const [selectedPlayerDetails, setSelectedPlayerDetails] = useState(null);
  const [footballImage, setFootballImage] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/getMatches_carroms")
      .then((response) => setMatches(response.data))
      .catch((error) => console.error(error));
    
    axios
      .get(`/api/auth/sportsItems/name/carrom`)
      .then((response) => {
        setFootballImage(response.data.image);
      })
      .catch((error) => {
        console.error("Error fetching football image:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    setNewMatch({ ...newMatch, [e.target.name]: e.target.value });
  };

  const handleAddMatch = () => {
    if (selectedMatch) {
      // Update existing match
      axios
        .put(
          `http://localhost:5000/api/auth/updateMatch_carroms/${selectedMatch._id}`,
          newMatch
        )
        .then((response) => {
          setMatches(
            matches.map((match) =>
              match._id === selectedMatch._id ? response.data : match
            )
          );
          setNewMatch({ name: "", status: "future", gender: "boys" });
          setSelectedMatch(null);
          setIsFormVisible(false);
        })
        .catch((error) => console.error(error));
    } else {
      // Add new match
      axios
        .post("http://localhost:5000/api/auth/addMatch_carroms", newMatch)
        .then((response) => {
          setMatches([...matches, response.data]);
          setNewMatch({ name: "", status: "future", gender: "boys" });
          setIsFormVisible(false);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDeleteMatch = () => {
    if (selectedMatch) {
      axios
        .delete(
          `http://localhost:5000/api/auth/deleteMatch_carroms/${selectedMatch._id}`
        )
        .then(() => {
          setMatches(
            matches.filter((match) => match._id !== selectedMatch._id)
          );
          setNewMatch({ name: "", status: "future", gender: "boys" });
          setSelectedMatch(null);
          setIsFormVisible(false);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleRowClick = (match) => {
    setSelectedMatch(match);
    setNewMatch({ ...match });

    // Fetch scores for the selected match
    axios
      .get(`http://localhost:5000/api/auth/getScores_carroms/${match._id}`)
      .then((response) => setScores(response.data))
      .catch((error) => console.error(error));
    axios
      .get(
        `http://localhost:5000/api/auth/getPlayers_carroms/${match._id}?team=TeamA`
      )
      .then((response) => setPlayersTeamA(response.data))
      .catch((error) => console.error(error));

    axios
      .get(
        `http://localhost:5000/api/auth/getPlayers_carroms/${match._id}?team=TeamB`
      )
      .then((response) => setPlayersTeamB(response.data))
      .catch((error) => console.error(error));
  };

  const handleScoreRowClick = (score) => {
    setSelectedScoreDetails(score); // Set selected score details
    setScoreFormData({
      teams: score.teams,
      round1: score.round1,
    });
  };

  const handleHideForm = () => {
    setNewMatch({ name: "", status: "future" });
    setSelectedMatch(null);
    setIsFormVisible(false);
  };

  const handleScoreInputChange = (e) => {
    setScoreFormData({ ...scoreFormData, [e.target.name]: e.target.value });
  };

  const handleAddScore = () => {
    if (selectedMatch) {
      axios
        .post(
          `http://localhost:5000/api/auth/addScores_carroms/${selectedMatch._id}`,
          {
            ...scoreFormData,
            round1: parseInt(scoreFormData.round1), // Parse round1 to integer
          }
        )
        .then((response) => {
          setScores([...scores, response.data]);
          setScoreFormData({
            teams: "",
            round1: "",
          });
        })
        .catch((error) => console.error(error));
    }
  };

  const handleUpdateScore = () => {
    if (selectedMatch && selectedScoreDetails && selectedScoreDetails._id) {
      const scoreId = selectedScoreDetails._id;

      // Update existing score
      axios
        .put(
          `http://localhost:5000/api/auth/updateScoredetails_carroms/${selectedMatch._id}/${scoreId}`,
          {
            ...scoreFormData,
            round1: parseInt(scoreFormData.round1), // Parse round1 to integer
          }
        )
        .then((response) => {
          console.log("Update Score Response:", response.data);
          setScores(
            scores.map((score) =>
              score._id === selectedScoreDetails._id ? response.data : score
            )
          );
          setScoreFormData({
            teams: "",
            round1: "",
          });
          setSelectedScoreDetails(null);
        })
        .catch((error) => console.error(error));
    } else {
      console.log(
        "Selected match or score details are not populated correctly."
      );
    }
  };

  const handleDeleteScore = () => {
    if (selectedScoreDetails) {
      const matchId = selectedMatch._id;
      const scoreId = selectedScoreDetails._id;

      axios
        .delete(
          `http://localhost:5000/api/auth/deleteScoredetails_carroms/${scoreId}/${matchId}`
        )
        .then(() => {
          const updatedScores = scores.filter(
            (score) => score._id !== selectedScoreDetails._id
          );

          setScores(updatedScores);
          setScoreFormData({
            teams: "",
            round1: "",
          });
          setSelectedScoreDetails(null);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleToggleAddScoreForm = () => {
    setIsAddScoreFormVisible(!isAddScoreFormVisible);
  };

  const handleHideAddScoreForm = () => {
    setIsAddScoreFormVisible(false);
  };

  const handlePlayerInputChange = (e) => {
    setPlayerFormData({ ...playerFormData, [e.target.name]: e.target.value });
  };

  const handleAddPlayer = () => {
    if (selectedMatch) {
      axios
        .post(
          `http://localhost:5000/api/auth/addPlayers_carroms/${selectedMatch._id}`,
          {
            ...playerFormData,
            rollNo: parseInt(playerFormData.rollNo), // Parse rollNo to integer
            year: parseInt(playerFormData.year), // Parse year to integer
          }
        )
        .then((response) => {
          const updatedPlayers = [...playersTeamA];

          if (playerFormData.team_status === "TeamA") {
            updatedPlayers.push(response.data);
            setPlayersTeamA(updatedPlayers);
          } else if (playerFormData.team_status === "TeamB") {
            const updatedPlayers = [...playersTeamB];
            updatedPlayers.push(response.data);
            setPlayersTeamB(updatedPlayers);
          }

          setPlayerFormData({
            player_name: "",
            roll_no: "",
            year: "",
            team_status: "TeamA", // Set default team_status to TeamA
          });
        })
        .catch((error) => console.error(error));
    }
  };

  const handlePlayerRowClick = (player) => {
    setSelectedPlayerDetails(player);
    setPlayerFormData({
      player_name: player.player_name,
      roll_no: player.roll_no,
      year: player.year,
      team_status: player.team_status,
    });
  };

  const handleUpdatePlayer = () => {
    if (selectedMatch && selectedPlayerDetails) {
      const matchId = selectedMatch._id;
      const playerId = selectedPlayerDetails._id;

      // Update existing player
      axios
        .put(
          `http://localhost:5000/api/auth/updatePlayerDetails_carroms/${matchId}/${playerId}`,
          {
            player_name: playerFormData.player_name,
            roll_no: parseInt(playerFormData.roll_no), // Parse rollNo to integer
            year: parseInt(playerFormData.year), // Parse year to integer
            team_status: playerFormData.team_status,
          }
        )
        .then((response) => {
          const updatedPlayer = response.data;

          // Update the corresponding player in the appropriate team
          const updatedPlayers =
            playerFormData.team_status === "TeamA"
              ? playersTeamA.map((player) =>
                  player._id === playerId ? updatedPlayer : player
                )
              : playersTeamB.map((player) =>
                  player._id === playerId ? updatedPlayer : player
                );

          // Set the updated players to the respective state
          playerFormData.team_status === "TeamA"
            ? setPlayersTeamA(updatedPlayers)
            : setPlayersTeamB(updatedPlayers);

          // Reset the form data and selected player details
          setPlayerFormData({
            player_name: "",
            roll_no: "",
            year: "",
            team_status: "TeamA", // Set default team_status to TeamA
          });
          setSelectedPlayerDetails(null);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDeletePlayer = () => {
    if (selectedPlayerDetails) {
      const matchId = selectedMatch._id;
      const playerId = selectedPlayerDetails._id;

      console.log("Player ID:", playerId);
      console.log("Match ID:", matchId);

      if (!playerId || !matchId) {
        console.error("Player ID or Match ID is undefined");
        return;
      }

      axios
        .delete(
          `http://localhost:5000/api/auth/deletePlayerDetails_carroms/${playerId}/${matchId}`
        )
        .then(() => {
          const updatedPlayers =
            selectedPlayerDetails.team_status === "TeamA"
              ? playersTeamA.filter(
                  (player) => player._id !== selectedPlayerDetails._id
                )
              : playersTeamB.filter(
                  (player) => player._id !== selectedPlayerDetails._id
                );

          selectedPlayerDetails.team_status === "TeamA"
            ? setPlayersTeamA(updatedPlayers)
            : setPlayersTeamB(updatedPlayers);

          setPlayerFormData({
            player_name: "",
            roll_no: "",
            year: "",
            team_status: "TeamA", // Set default team_status to TeamA
          });
          setSelectedPlayerDetails(null);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleHideAddPlayerForm = () => {
    setIsAddPlayerFormVisible(false);
  };

  const handleToggleAddPlayerForm = () => {
    setIsAddPlayerFormVisible(!isAddPlayerFormVisible);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Carroms Page</h1>
      {/*--------------------------------------------------------------------------------------------------------- */}
      {isAdmin && (
        <div className="mb-3">
          {!isFormVisible ? (
            <button
              onClick={() => setIsFormVisible(true)}
              className="btn btn-primary mr-2"
            >
              Add Matches
            </button>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newMatch.name}
                  onChange={handleInputChange}
                  className="form-control mr-2"
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                  name="status"
                  value={newMatch.status}
                  onChange={handleInputChange}
                  className="form-control mr-2"
                >
                  <option value="past">Past</option>
                  <option value="present">Present</option>
                  <option value="future">Future</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                  name="gender"
                  value={newMatch.gender}
                  onChange={handleInputChange}
                  className="form-control mr-2"
                >
                  <option value="boys">Boys</option>
                  <option value="girls">Girls</option>
                </select>
              </div>

              <button onClick={handleAddMatch} className="btn btn-primary mr-2">
                {selectedMatch ? "Update Match" : "Add Match"}
              </button>

              {selectedMatch && (
                <button
                  onClick={handleDeleteMatch}
                  className="btn btn-danger mr-2"
                >
                  Delete Match
                </button>
              )}

              <button onClick={handleHideForm} className="btn btn-secondary">
                Hide
              </button>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      <div>
        <h2>Boys Matches</h2>
        <div className="row">
          <div className="col-md-4">
            <h4>Yesterday</h4>
            <ul className="list-group">
              {matches
                .filter(
                  (match) => match.status === "past" && match.gender === "boys"
                )
                .map((match) => (
                  <li
                    key={match._id}
                    className={`list-group-item ${
                      selectedMatch && selectedMatch._id === match._id
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleRowClick(match)}
                  >
                    {match.name}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Today</h4>
            <ul className="list-group">
              {matches
                .filter(
                  (match) =>
                    match.status === "present" && match.gender === "boys"
                )
                .map((match) => (
                  <li
                    key={match._id}
                    className={`list-group-item ${
                      selectedMatch && selectedMatch._id === match._id
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleRowClick(match)}
                  >
                    {match.name}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Tomorrow</h4>
            <ul className="list-group">
              {matches
                .filter(
                  (match) =>
                    match.status === "future" && match.gender === "boys"
                )
                .map((match) => (
                  <li
                    key={match._id}
                    className={`list-group-item ${
                      selectedMatch && selectedMatch._id === match._id
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleRowClick(match)}
                  >
                    {match.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Girls Matches */}
      <div>
        <h2>Girls Matches</h2>
        <div className="row">
          <div className="col-md-4">
            <h4>Yesterday</h4>
            <ul className="list-group">
              {matches
                .filter(
                  (match) => match.status === "past" && match.gender === "girls"
                )
                .map((match) => (
                  <li
                    key={match._id}
                    className={`list-group-item ${
                      selectedMatch && selectedMatch._id === match._id
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleRowClick(match)}
                  >
                    {match.name}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Today</h4>
            <ul className="list-group">
              {matches
                .filter(
                  (match) =>
                    match.status === "present" && match.gender === "girls"
                )
                .map((match) => (
                  <li
                    key={match._id}
                    className={`list-group-item ${
                      selectedMatch && selectedMatch._id === match._id
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleRowClick(match)}
                  >
                    {match.name}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Tomorrow</h4>
            <ul className="list-group">
              {matches
                .filter(
                  (match) =>
                    match.status === "future" && match.gender === "girls"
                )
                .map((match) => (
                  <li
                    key={match._id}
                    className={`list-group-item ${
                      selectedMatch && selectedMatch._id === match._id
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleRowClick(match)}
                  >
                    {match.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
      <div className="mt-4">
        <h3>Score Details</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Teams</th>
              <th>Goals</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr
                key={index}
                className={`${
                  selectedScoreDetails && selectedScoreDetails._id === score._id
                    ? "active"
                    : ""
                }`}
                onClick={() => handleScoreRowClick(score)}
              >
                <td>{score.teams}</td>
                <td>{score.round1}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Score Form */}
        {isAdmin && selectedMatch && isAddScoreFormVisible && (
          <div className="form-row">
            <div className="form-group col-md-3">
              <label>Teams:</label>
              <input
                type="text"
                name="teams"
                value={scoreFormData.teams}
                onChange={handleScoreInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Round 1:</label>
              <input
                type="number"
                name="round1"
                value={scoreFormData.round1}
                onChange={handleScoreInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group col-md-12">
              <button onClick={handleAddScore} className="btn btn-primary mr-2">
                Add Score
              </button>
              <button
                onClick={handleUpdateScore}
                className="btn btn-danger mr-2"
              >
                Update Score
              </button>
              <button
                onClick={handleDeleteScore}
                className="btn btn-danger mr-2"
              >
                Delete Score
              </button>
              <button
                onClick={handleHideAddScoreForm}
                className="btn btn-secondary"
              >
                Hide
              </button>
            </div>
          </div>
        )}

        {/* Toggle Add Score Form Button */}
        {isAdmin && selectedMatch && !isAddScoreFormVisible && (
          <button
            onClick={handleToggleAddScoreForm}
            className="btn btn-success mt-2"
          >
            Add Score
          </button>
        )}
      </div>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
      <div className="mt-4">
        <h3>Players Details</h3>

        <div className="row">
          <div className="col-md-6">
            <div>
              <h4>TeamA Players</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Year</th>
                    <th>Roll No</th>
                  </tr>
                </thead>
                <tbody>
                  {playersTeamA.map((player, index) => (
                    <tr
                      key={index}
                      onClick={() => handlePlayerRowClick(player)}
                    >
                      <td>{index + 1}</td>
                      <td>{player.player_name}</td>
                      <td>{player.year}</td>
                      <td>{player.roll_no}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-md-6">
            <div>
              <h4>TeamB Players</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Year</th>
                    <th>Roll No</th>
                  </tr>
                </thead>
                <tbody>
                  {playersTeamB.map((player, index) => (
                    <tr
                      key={index}
                      onClick={() => handlePlayerRowClick(player)}
                    >
                      <td>{index + 1}</td>
                      <td>{player.player_name}</td>
                      <td>{player.year}</td>
                      <td>{player.roll_no}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {isAdmin && selectedMatch && isAddPlayerFormVisible && (
          <div className="form-row">
            <div className="form-group col-md-3">
              <label>Player Name:</label>
              <input
                type="text"
                name="player_name"
                value={playerFormData.player_name}
                onChange={handlePlayerInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Roll No:</label>
              <input
                type="number"
                name="roll_no"
                value={playerFormData.roll_no}
                onChange={handlePlayerInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Year:</label>
              <input
                type="number"
                name="year"
                value={playerFormData.year}
                onChange={handlePlayerInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Team:</label>
              <select
                name="team_status"
                value={playerFormData.team_status}
                onChange={handlePlayerInputChange}
                className="form-control"
              >
                <option value="TeamA">TeamA</option>
                <option value="TeamB">TeamB</option>
              </select>
            </div>
            <div className="form-group col-md-12">
              <button onClick={handleAddPlayer} className="btn btn-danger mr-2">
                Add Player
              </button>
              <button
                onClick={handleUpdatePlayer}
                className="btn btn-danger mr-2"
              >
                Update Player
              </button>
              <button
                onClick={handleDeletePlayer}
                className="btn btn-danger mr-2"
              >
                Delete Player
              </button>
              <button
                onClick={handleHideAddPlayerForm}
                className="btn btn-secondary"
              >
                Hide
              </button>
            </div>
          </div>
        )}

        {/* Toggle Add Player Form Button */}
        {isAdmin && selectedMatch && !isAddPlayerFormVisible && (
          <button
            onClick={handleToggleAddPlayerForm}
            className="btn btn-success mt-2"
          >
            Add Player
          </button>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        {footballImage && (
          <img
            src={`data:image/jpeg;base64,${footballImage}`}
            alt="Football"
            style={{ maxWidth: "50%", maxHeight: "50%" }}
          />
        )}
      </div>

    </div>
  );
};

export default Carroms;
