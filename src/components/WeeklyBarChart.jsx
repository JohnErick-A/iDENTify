import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function WeeklyBarChart() {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = {
    labels,
    datasets: [
      {
        label: "Check-ups",
        data: [5, 8, 3, 7, 6, 2, 4],
        backgroundColor: "rgba(17, 120, 219, 0.7)",
      },
      {
        label: "Appointments",
        data: [3, 4, 2, 5, 4, 1, 2],
        backgroundColor: "rgba(95, 142, 167, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="chart-card">
      <h3 className="chart-title">Weekly Check-ups & Appointments</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default WeeklyBarChart;
