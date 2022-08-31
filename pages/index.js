import { useRef, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart, Radar } from "react-chartjs-2";
import LabelCreator from "../components/LabelCreator";
import EntryCreator from "../components/EntryCreator";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Home() {
  const chartRef = useRef(null);
  const [labels, setLabels] = useState([
    "Pranks",
    "Sales",
    "Beets",
    "Sci-Fi",
    "Basketball",
    "Romantic",
    "Gullible",
  ]);

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  const [gradient1, setGradient1] = useState(null);
  const [gradient2, setGradient2] = useState(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      var sizeWidth = chart.ctx.canvas.clientWidth;
      var sizeHeight = chart.ctx.canvas.clientHeight;
      const gradient1 = chart.ctx.createRadialGradient(
        sizeWidth / 2,
        sizeHeight / 2,
        1,
        sizeWidth / 2,
        sizeHeight / 2,
        sizeWidth * 0.9
      );
      gradient1.addColorStop(0, `#ff638400`);
      gradient1.addColorStop(1, "#ff6384");
      setGradient1(gradient1);

      const gradient2 = chart.ctx.createRadialGradient(
        sizeWidth / 2,
        sizeHeight / 2,
        1,
        sizeWidth / 2,
        sizeHeight / 2,
        sizeWidth * 0.9
      );
      gradient2.addColorStop(0, `#36a2eb00`);
      gradient2.addColorStop(1, "#36a2eb");
      setGradient2(gradient2);
    }
  }, []);

  const datasets = [
    {
      label: "Jim",
      data: [100, 80, 12, 0, 87, 92, 23],
      fill: true,
      backgroundColor: gradient1,
      borderColor: "#ff6384",
      pointBackgroundColor: "#ff6384",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#ff6384",
      tension: 0.2,
    },
    {
      label: "Dwight",
      data: [12, 82, 100, 77, 9, 84, 70],
      fill: true,
      backgroundColor: gradient2,
      borderColor: "#36a2eb",
      pointBackgroundColor: "#36a2eb",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#36a2eb",
      tension: 0.2,
    },
  ];

  const addEntry = (entry) => {
    const chart = chartRef.current;

    if (chart) {
      var sizeWidth = chart.ctx.canvas.clientWidth;
      var sizeHeight = chart.ctx.canvas.clientHeight;
      const gradient = chart.ctx.createRadialGradient(
        sizeWidth / 2,
        sizeHeight / 2,
        1,
        sizeWidth / 2,
        sizeHeight / 2,
        sizeWidth * 0.9
      );
      gradient.addColorStop(0, `${entry.color}00`);
      gradient.addColorStop(1, entry.color);
    }

    const newDataset = {
      label: entry.name,
      data: entry.values,
      fill: true,
      backgroundColor: gradient,
      borderColor: entry.color,
      pointBackgroundColor: entry.color,
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: entry.color,
      tension: 0.2,
    };

    console.log("adding entry", newDataset);

    datasets.push(newDataset);

    // setDatasets([...datasets, newDataset]);
  };

  const removeEntry = (index) => {
    const newDatasets = [...datasets];
    newDatasets.splice(index, 1);
    setDatasets(newDatasets);
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        // Purple and green play nicely together.
        main: "#fdcfff",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <Head>
          <title>Spirdergram</title>
          <meta name="description" content="Spidergram" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className={styles.title}>Spidergram</h1>

        <Radar
          ref={chartRef}
          data={{ labels: labels, datasets: datasets }}
          options={{
            scales: {
              r: {
                max: 100,
                min: 0,
                grid: {
                  color: "white",
                },
                ticks: {
                  stepSize: 25,
                  display: false,
                  color: "white",
                },
                angleLines: {
                  color: "white",
                },
                pointLabels: {
                  color: "white",
                  font: {
                    size: 20,
                  },
                },
              },
            },
          }}
          redraw
          key={Math.random()}
        />

        <Link href="/custom">
          <a className={styles.button}>Get started!</a>
        </Link>
      </div>
    </ThemeProvider>
  );
}
