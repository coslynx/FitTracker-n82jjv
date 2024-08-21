"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LineController,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LineController,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

interface ProgressChartProps {
  fitnessData: any[];
}

const ProgressChart = ({ fitnessData }: ProgressChartProps) => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (fitnessData.length > 0) {
      const labels = fitnessData.map((data: any) =>
        new Date(data.date).toLocaleDateString()
      );

      const weightData = fitnessData.map((data: any) => data.weight);
      const stepsData = fitnessData.map((data: any) => data.steps);
      const caloriesBurnedData = fitnessData.map((data: any) =>
        data.caloriesBurned
      );

      setChartData({
        labels,
        datasets: [
          {
            label: "Weight (kg)",
            data: weightData,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
          {
            label: "Steps",
            data: stepsData,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
          },
          {
            label: "Calories Burned",
            data: caloriesBurnedData,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      });
    }
  }, [fitnessData]);

  return (
    <div className="p-4 rounded-lg shadow-md bg-white">
      <Line data={chartData} />
    </div>
  );
};

export default ProgressChart;