// LiveMatches.js
import React, { useState } from "react";

function LiveMatches() {
  const [boysMatches, setBoysMatches] = useState([
    {
      type: "Cricket",
      team1: "TeamA",
      team2: "TeamB",
      score: "120/3",
      likes: 0,
    },
    {
      type: "Football",
      team1: "TeamA",
      team2: "TeamB",
      score: "2-1",
      likes: 0,
    },
    {
      type: "Basketball",
      team1: "TeamA",
      team2: "TeamB",
      score: "2-1",
      likes: 0,
    },
    { type: "Kabbadi", team1: "TeamA", team2: "TeamB", score: "2-1", likes: 0 },
    // Add more boys matches as needed
  ]);

  const [girlsMatches, setGirlsMatches] = useState([
    {
      type: "Volleyball",
      team1: "TeamA",
      team2: "TeamB",
      score: "2-1",
      likes: 0,
    },
    {
      type: "Throwball",
      team1: "TeamA",
      team2: "TeamB",
      score: "2-1",
      likes: 0,
    },
    { type: "Carrom", team1: "TeamA", team2: "TeamB", score: "2-1", likes: 0 },
    // Add more girls matches as needed
  ]);

  const handleLike = (match, index, isBoysMatch) => {
    const updatedMatches = isBoysMatch ? [...boysMatches] : [...girlsMatches];
    updatedMatches[index].likes += 1;
    isBoysMatch
      ? setBoysMatches(updatedMatches)
      : setGirlsMatches(updatedMatches);
  };

  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ borderBottom: "2px solid #333", paddingBottom: "10px" }}>
        Live Matches
      </h2>

      <div>
        <h3>Boys Matches</h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {boysMatches.map((match, index) => (
            <div
              key={index}
              style={{
                flex: "1",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "10px",
                marginBottom: "20px",
              }}
            >
              <h4>{match.type}</h4>
              <p>{`${match.team1} vs ${match.team2}`}</p>
              <p>Score: {match.score}</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => handleLike(match, index, true)}>
                  TA {match.likes}{" "}
                  <span role="img" aria-label="Like">
                    ❤️
                  </span>
                </button>
                <button onClick={() => handleLike(match, index, true)}>
                  TB {match.likes}{" "}
                  <span role="img" aria-label="Like">
                    ❤️
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Girls Matches</h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {girlsMatches.map((match, index) => (
            <div
              key={index}
              style={{
                flex: "1",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "10px",
                marginBottom: "20px",
              }}
            >
              <h4>{match.type}</h4>
              <p>{`${match.team1} vs ${match.team2}`}</p>
              <p>Score: {match.score}</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => handleLike(match, index, false)}>
                  TA {match.likes}{" "}
                  <span role="img" aria-label="Like">
                    ❤️
                  </span>
                </button>
                <button onClick={() => handleLike(match, index, false)}>
                  TB {match.likes}{" "}
                  <span role="img" aria-label="Like">
                    ❤️
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LiveMatches;
