import React, { useState } from "react";

const Football = () => {
  // State variables for managing visibility and data
  const [isMatchFormVisible, setMatchFormVisible] = useState(false);
  const [isScoreFormVisible, setScoreFormVisible] = useState(false);
  const [isPlayerFormVisible, setPlayerFormVisible] = useState(false);
  const [scoreData, setScoreData] = useState({
    team: "",
    round1: "",
    round2: "",
    round3: "",
  });
  const [playerData, setPlayerData] = useState({ team1: "", team2: "" });

  // Function to handle submission of score form
  const handleScoreFormSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle the submitted score data (e.g., send to backend)
    console.log("Score Form Submitted:", scoreData);
    // Clear the form
    setScoreData({ team: "", round1: "", round2: "", round3: "" });
  };

  // Function to handle submission of player form
  const handlePlayerFormSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle the submitted player data (e.g., send to backend)
    console.log("Player Form Submitted:", playerData);
    // Clear the form
    setPlayerData({ team1: "", team2: "" });
  };

  return (
    <div>
      <h1>Schedule Matches</h1>
      <button onClick={() => setMatchFormVisible(true)}>Add</button>

      {isMatchFormVisible && (
        <div>
          <div>
            <h2>Score Details</h2>
            <button onClick={() => setScoreFormVisible(true)}>Add Score</button>
            {isScoreFormVisible && (
              <form onSubmit={handleScoreFormSubmit}>
                <label>
                  Team:
                  <input
                    type="text"
                    value={scoreData.team}
                    onChange={(e) =>
                      setScoreData({ ...scoreData, team: e.target.value })
                    }
                  />
                </label>
                <label>
                  Round 1:
                  <input
                    type="text"
                    value={scoreData.round1}
                    onChange={(e) =>
                      setScoreData({ ...scoreData, round1: e.target.value })
                    }
                  />
                </label>
                <label>
                  Round 2:
                  <input
                    type="text"
                    value={scoreData.round2}
                    onChange={(e) =>
                      setScoreData({ ...scoreData, round2: e.target.value })
                    }
                  />
                </label>
                <label>
                  Round 3:
                  <input
                    type="text"
                    value={scoreData.round3}
                    onChange={(e) =>
                      setScoreData({ ...scoreData, round3: e.target.value })
                    }
                  />
                </label>
                <button type="submit">Add Score</button>
                <button onClick={() => setScoreFormVisible(false)}>Hide</button>
              </form>
            )}
          </div>

          <div>
            <h2>Players Details</h2>
            <button onClick={() => setPlayerFormVisible(true)}>
              Add Players Details
            </button>
            {isPlayerFormVisible && (
              <form onSubmit={handlePlayerFormSubmit}>
                <label>
                  Team 1:
                  <input
                    type="text"
                    value={playerData.team1}
                    onChange={(e) =>
                      setPlayerData({ ...playerData, team1: e.target.value })
                    }
                  />
                </label>
                <label>
                  Team 2:
                  <input
                    type="text"
                    value={playerData.team2}
                    onChange={(e) =>
                      setPlayerData({ ...playerData, team2: e.target.value })
                    }
                  />
                </label>
                <button type="submit">Add Players Details</button>
                <button onClick={() => setPlayerFormVisible(false)}>
                  Hide
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Football;
