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
        backgroundColor: "rgba(95, 142, 167, 0.85)",
        borderColor: "rgba(95, 142, 167, 1)",
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: "Appointments",
        data: [3, 4, 2, 5, 4, 1, 2],
        backgroundColor: "rgba(26, 58, 82, 0.7)",
        borderColor: "rgba(26, 58, 82, 0.9)",
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 13,
            weight: "600",
            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          },
          color: "#415165",
          padding: 15,
          usePointStyle: true,
          pointStyle: "circle",
          boxHeight: 8,
        },
      },
      tooltip: {
        backgroundColor: "rgba(26, 58, 82, 0.9)",
        titleFont: { size: 13, weight: "600" },
        bodyFont: { size: 12 },
        padding: 12,
        borderRadius: 8,
        borderColor: "rgba(95, 142, 167, 0.3)",
        borderWidth: 1,
        displayColors: true,
        boxPadding: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2,
          font: { size: 12, weight: "500" },
          color: "#7a8595",
          padding: 8,
        },
        grid: {
          color: "rgba(95, 142, 167, 0.05)",
          drawBorder: false,
          lineWidth: 1,
        },
      },
      x: {
        ticks: {
          font: { size: 12, weight: "600" },
          color: "#415165",
          padding: 8,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
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
