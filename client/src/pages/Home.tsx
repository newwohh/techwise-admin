import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { Typography, Paper } from "@mui/material";
import axios, { AxiosResponse } from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Home() {
  const fetchAllOrders = async () => {
    const sellers: AxiosResponse = await axios.get(
      "http://localhost:8000/techwise/api/product/sales"
    );

    return sellers.data.data;
  };
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchAllOrders(),
  });

  const dayCounts: { [key: string]: number } = {};

  if (data) {
    Object.keys(data).forEach((day) => {
      dayCounts[day] = data[day].length;
    });
  }

  const dataFromApi = Object.values(dayCounts);
  const labelsFromApi = Object.keys(dayCounts);

  const datas = {
    labels: labelsFromApi,
    datasets: [
      {
        label: "sales of the week",
        data: dataFromApi,
        backgroundColor: "aqua",
        borderColor: "black",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };

  console.log();

  return (
    <div>
      <div>
        <Paper elevation={3} style={{ padding: 20, textAlign: "center" }}>
          <Typography>
            Manage your e-commerce platform with ease. View and analyze total
            sales, add or ban sellers, manage user accounts, and add products
            effortlessly.
          </Typography>
        </Paper>
      </div>
      <div style={{ height: "800px", marginTop: "50px" }}>
        <Line data={datas} options={options} height={500} width={1200} />
      </div>
    </div>
  );
}

export default Home;
