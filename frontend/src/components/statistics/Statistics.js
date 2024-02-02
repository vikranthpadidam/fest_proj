// Statistics.js
import React from "react";
import { Bar } from "react-chartjs-2";

const Statistics = () => {
  // Replace this with your actual data
  const branchData = [
    { sNo: 1, branchName: "BranchA", wins: 10 },
    { sNo: 2, branchName: "BranchB", wins: 15 },
    { sNo: 3, branchName: "BranchC", wins: 8 },
    // Add more branches as needed
  ];

  // Extracting branch names and wins for the chart
  const chartData = {
    labels: branchData.map((data) => data.branchName),
    datasets: [
      {
        label: "Wins Count",
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.8)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: branchData.map((data) => data.wins),
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: { type: "category", title: { display: true, text: "Branch Names" } },
      y: { title: { display: true, text: "Wins Count" }, beginAtZero: true },
    },
  };

  return (
    <div>
      <h2>Statistics</h2>

      {/* Wins Up to Date */}
      <div className="mb-4">
        <h3>Winning Status</h3>
      </div>

      {/* Table */}
      <div className="mb-4">
        <h3>Racing Trace</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Branch Name</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            {branchData.map((data) => (
              <tr key={data.sNo}>
                <td>{data.sNo}</td>
                <td>{data.branchName}</td>
                <td>{data.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bar Graph */}
      <div>
        <h3>Wins Distribution</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Statistics;
