import { useRef, useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { TwitterPicker } from "react-color";
import ReactSlider from "react-slider";
import { Button, Slider, TextField } from "@mui/material";

export default function EntryCreator({ labels, addEntry, setStep }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#eb144c");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [values, setValues] = useState(
    Array.from({ length: labels.length }, () => 50)
  );

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleChangeColor = (color) => {
    setColor(color.hex);
    toggleColorPicker();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSliderChange = (e, index) => {
    const newValues = values;
    newValues[index] = e.target.value;
    setValues(newValues);
  };

  const handleSubmit = () => {
    addEntry({ name: name, color: color, values: values });
    setStep(3);
  };

  return (
    <div
      className={styles.labelCreatorContainer}
      style={{ alignItems: "unset" }}
    >
      <h1 className={styles.title}>Add a graph</h1>
      <label htmlFor="name" className={styles.label}>
        Name:{" "}
      </label>
      <TextField
        variant="outlined"
        type="text"
        id="name"
        onChange={handleNameChange}
      />
      <label htmlFor="color" className={styles.label}>
        Color:{" "}
      </label>
      <div
        className={styles.colorPicker}
        style={{ backgroundColor: color }}
        onClick={toggleColorPicker}
      ></div>
      {showColorPicker ? (
        <TwitterPicker color={color} onChange={handleChangeColor} />
      ) : null}

      {labels.map((label, index) => (
        <div key={index} className={styles.sliderWrapper}>
          <label className={styles.label}>{label}:</label>
          <Slider
            defaultValue={50}
            onChange={(e) => {
              handleSliderChange(e, index);
            }}
            valueLabelDisplay="auto"
          ></Slider>
        </div>
      ))}
      <Button variant="outlined" onClick={handleSubmit}>
        Add data
      </Button>
    </div>
  );
}
