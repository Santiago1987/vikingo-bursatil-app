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
    },
  };

  let labels = [];
  let values_total: number[] = [];
  let call_values: number[] = [];
  let put_values: number[] = [];

  for (let elem of optionData) {
    let { base, total, callTotal, putTotal } = elem;
    labels.push(base);
    values_total.push(total);
    call_values.push(callTotal);
    put_values.push(putTotal);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Total",
        data: values_total,
        borderColor: "#4fff33",
        backgroundColor: "#4fff33",
        yAxisID: "y",
      },
      {
        label: "CALL",
        data: call_values,
        borderColor: "#d73017",
        backgroundColor: "#d73017",
        yAxisID: "y",
      },
      {
        label: "PUT",
        data: put_values,
        borderColor: "#ff33fc",
        backgroundColor: "#ff33fc",
        yAxisID: "y",
      },
    ],
  };

  return <Line options={options} data={data} />;
};
