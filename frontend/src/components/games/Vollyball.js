import React, { useState, useEffect } from "react";
import axios from "axios";

const Vollyball = () => {
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState({ name: "", status: "future" });
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAddScoreFormVisible, setIsAddScoreFormVisible] = useState(false);

  const [scoreFormData, setScoreFormData] = useState({
    teams: "",
    round1: "",
    round2: "",
    round3: "",
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

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/getMatches_volly")
      .then((response) => setMatches(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    setNewMatch({ ...newMatch, [e.target.name]: e.target.value });
  };

  const handleAddMatch = () => {
    if (selectedMatch) {
      // Update existing match
      axios
        .put(
          `http://localhost:5000/api/auth/updateMatch_volly/${selectedMatch._id}`,
          newMatch
        )
        .then((response) => {
          setMatches(
            matches.map((match) =>
              match._id === selectedMatch._id ? response.data : match
            )
          );
          setNewMatch({ name: "", status: "future" });
          setSelectedMatch(null);
          setIsFormVisible(false);
        })
        .catch((error) => console.error(error));
    } else {
      // Add new match
      axios
        .post("http://localhost:5000/api/auth/addMatch_volly", newMatch)
        .then((response) => {
          setMatches([...matches, response.data]);
          setNewMatch({ name: "", status: "future" });
          setIsFormVisible(false);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDeleteMatch = () => {
    if (selectedMatch) {
      axios
        .delete(
          `http://localhost:5000/api/auth/deleteMatch_volly/${selectedMatch._id}`
        )
        .then(() => {
          setMatches(
            matches.filter((match) => match._id !== selectedMatch._id)
          );
          setNewMatch({ name: "", status: "future" });
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
      .get(`http://localhost:5000/api/auth/getScores_volly/${match._id}`)
      .then((response) => setScores(response.data))
      .catch((error) => console.error(error));
    axios
      .get(
        `http://localhost:5000/api/auth/getPlayers_volly/${match._id}?team=TeamA`
      )
      .then((response) => setPlayersTeamA(response.data))
      .catch((error) => console.error(error));

    axios
      .get(
        `http://localhost:5000/api/auth/getPlayers_volly/${match._id}?team=TeamB`
      )
      .then((response) => setPlayersTeamB(response.data))
      .catch((error) => console.error(error));
  };

  const handleScoreRowClick = (score) => {
    setSelectedScoreDetails(score); // Set selected score details
    setScoreFormData({
      teams: score.teams,
      round1: score.round1,
      round2: score.round2,
      round3: score.round3,
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
          `http://localhost:5000/api/auth/addScores_volly/${selectedMatch._id}`,
          scoreFormData
        )
        .then((response) => {
          setScores([...scores, response.data]);
          setScoreFormData({
            teams: "",
            round1: "",
            round2: "",
            round3: "",
          });
        })
        .catch((error) => console.error(error));
    }
  };

  const handleUpdateScore = () => {
    if (selectedMatch && selectedScoreDetails) {
      console.log(selectedScoreDetails._id);
      console.log(selectedMatch);
      // Update existing score
      axios
        .put(
          `http://localhost:5000/api/auth/updateScoredetails_volly/${selectedScoreDetails._id}`,
          scoreFormData
        )
        .then((response) => {
          setScores(
            scores.map((score) =>
              score._id === selectedScoreDetails._id ? response.data : score
            )
          );
          setScoreFormData({
            teams: "",
            round1: "",
            round2: "",
            round3: "",
          });
          setSelectedScoreDetails(null);
        })
        .catch((error) => console.error(error));
    }
  };

  // Modify the handleDeleteScore function
  const handleDeleteScore = () => {
    if (selectedScoreDetails) {
      const matchId = selectedMatch._id;
      const scoreId = selectedScoreDetails._id;

      axios
        .delete(
          `http://localhost:5000/api/auth/deleteScoredetails_volly/${scoreId}`,
          {
            data: { matchId: matchId },
          }
        )
        .then(() => {
          const updatedScores = scores.filter(
            (score) => score._id !== selectedScoreDetails._id
          );

          setScores(updatedScores);
          setScoreFormData({
            teams: "",
            round1: "",
            round2: "",
            round3: "",
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
          `http://localhost:5000/api/auth/addPlayers_volly/${selectedMatch._id}`,
          playerFormData
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
      const { _id } = selectedPlayerDetails;

      // Update existing player
      axios
        .put(
          `http://localhost:5000/api/auth/updatePlayerDetails_volly/${_id}`,
          {
            player_name: playerFormData.player_name,
            roll_no: playerFormData.roll_no,
            year: playerFormData.year,
            team_status: playerFormData.team_status,
          }
        )
        .then((response) => {
          const updatedPlayer = response.data;

          // Update the corresponding player in the appropriate team
          const updatedPlayers =
            playerFormData.team_status === "TeamA"
              ? playersTeamA.map((player) =>
                  player._id === _id ? updatedPlayer : player
                )
              : playersTeamB.map((player) =>
                  player._id === _id ? updatedPlayer : player
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
      axios
        .delete(
          `http://localhost:5000/api/auth/deletePlayerDetails_volly/${selectedPlayerDetails._id}`
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
      <h1 className="mb-4">Football App</h1>
      {/*--------------------------------------------------------------------------------------------------------- */}
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
            <label className="mr-2">Name:</label>
            <input
              type="text"
              name="name"
              value={newMatch.name}
              onChange={handleInputChange}
              className="form-control mr-2"
            />
            <label className="mr-2">Status:</label>
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

            <button onClick={handleAddMatch} className="btn btn-primary mr-2">
              {selectedMatch ? "Update Match" : "Add Match"}
            </button>
            {/* {selectedMatch && ( */}
            <button onClick={handleDeleteMatch} className="btn btn-danger mr-2">
              Delete Match
            </button>
            {/* )} */}

            <button onClick={handleHideForm} className="btn btn-secondary">
              Hide
            </button>
          </div>
        )}
      </div>
      {/* ------------------------------------------------------------------ */}
      <div>
        <h2>Matches</h2>
        <div className="row">
          <div className="col-md-4">
            <h4>Yesterday</h4>
            <ul className="list-group">
              {matches
                .filter((match) => match.status === "past")
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
                .filter((match) => match.status === "present")
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
                .filter((match) => match.status === "future")
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
              <th>Round 1</th>
              <th>Round 2</th>
              <th>Round 3</th>
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
                <td>{score.round2}</td>
                <td>{score.round3}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Score Form */}
        {selectedMatch && isAddScoreFormVisible && (
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
                type="text"
                name="round1"
                value={scoreFormData.round1}
                onChange={handleScoreInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Round 2:</label>
              <input
                type="text"
                name="round2"
                value={scoreFormData.round2}
                onChange={handleScoreInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Round 3:</label>
              <input
                type="text"
                name="round3"
                value={scoreFormData.round3}
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
        {selectedMatch && !isAddScoreFormVisible && (
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

        {selectedMatch && isAddPlayerFormVisible && (
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
                type="text"
                name="roll_no"
                value={playerFormData.roll_no}
                onChange={handlePlayerInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Year:</label>
              <input
                type="text"
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
        {selectedMatch && !isAddPlayerFormVisible && (
          <button
            onClick={handleToggleAddPlayerForm}
            className="btn btn-success mt-2"
          >
            Add Player
          </button>
        )}
      </div>
    </div>
  );
};

export default Vollyball;
