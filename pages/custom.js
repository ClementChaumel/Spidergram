import { useRef, useState, useEffect } from "react";
import Head from "next/head";
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
import { Radar } from "react-chartjs-2";
import LabelCreator from "../components/LabelCreator";
import EntryCreator from "../components/EntryCreator";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function Home() {
  const chartRef = useRef(null);
  const [labels, setLabels] = useState([]);

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  const [datasets, setDatasets] = useState([]);

  const [step, setStep] = useState(1);

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
        sizeWidth * 0.8
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

    setDatasets([...datasets, newDataset]);
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
      <div className={styles.formContainer}>
        <Head>
          <title>Create your own Spidergram</title>
          <meta name="description" content="Create your own Spidergram" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div
          style={{
            opacity: step === 3 ? "1" : "0",
            height: step === 3 ? "auto" : "0",
            overflow: step === 3 ? "auto" : "hidden",
          }}
        >
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
            style={{ opacity: step === 3 ? "1" : "0" }}
          />
        </div>

        {step === 1 ? (
          <LabelCreator
            labels={labels}
            setLabels={setLabels}
            setStep={setStep}
          />
        ) : null}
        {step === 2 ? (
          <EntryCreator labels={labels} addEntry={addEntry} setStep={setStep} />
        ) : null}

        {step === 3 ? (
          <>
            {datasets.map((dataset, index) => (
              <div key={index} className={styles.labelRow}>
                <p className={styles.label}>{dataset.label}</p>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    removeEntry(index);
                  }}
                >
                  <Delete />
                </IconButton>
              </div>
            ))}
            <div className={styles.buttonsContainer}>
              <Button variant="outlined" onClick={() => setStep(1)}>
                Edit Axes
              </Button>
              <Button variant="outlined" onClick={() => setStep(2)}>
                Add graph
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </ThemeProvider>
  );
}
