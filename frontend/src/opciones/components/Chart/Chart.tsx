import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  elements,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { OptionResult } from "../../../types";
import "./chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  elements
);

export const Chart = ({ optionData }: { optionData: OptionResult[] }) => {
  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Grafico Resultante",
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  let labels = [];
  let values_total = [];

  for (let elem of optionData) {
    let { base, total } = elem;
    labels.push(base);
    values_total.push(total);
  }

  const zero = [...values_total].fill(0, 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Total",
        data: values_total,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Total",
        data: zero,
        borderColor: "#fff",
        backgroundColor: "#fff",
        yAxisID: "y",
      },
    ],
  };

  return <Line options={options} data={data} />;
};
