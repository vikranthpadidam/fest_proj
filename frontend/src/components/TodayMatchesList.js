import React from "react";

function TodayMatchesList() {
  // Replace this with your actual data
  const todayMatches = [
    { time: "10:00 AM", teams: "Branch1 Vs Branch2", sports: "Cricket" },
    // Add more matches as needed
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Today's Matches</h2>
      <div className="table-responsive">
        <table
          className="table table-bordered table-dark"
          style={{
             backgroundColor:"#fff",
            borderRadius: "15px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr>
              <th scope="col">Teams</th>
              <th scope="col">Sports</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {todayMatches.map((match, index) => (
              <tr key={index}>
                <td>{match.teams}</td>
                <td>{match.sports}</td>
                <td>{match.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodayMatchesList;
