// CricketBoys.js
import React from "react";
//import { BiCalendar } from "react-icons/bi";

const Chess = () => {
  // Replace this with your actual data
  const players = [
    { name: "Player1", pastMatches: 5, presentMatches: 2, upcomingMatches: 3 },
    // Add more players as needed
  ];

  return (
    <div>
      <h2>Cricket - Boys</h2>
      <img src="cricket_timetable_image.jpg" alt="Cricket Timetable" />

      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Past Matches</th>
            <th>Present Matches</th>
            <th>Upcoming Matches</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.pastMatches}</td>
              <td>{player.presentMatches}</td>
              <td>{player.upcomingMatches}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Chess;
