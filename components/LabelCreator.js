import { Button, IconButton, TextField } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

export default function LabelCreator({ labels, setLabels, setStep }) {
  const inputRef = useRef(null);
  const [currentLabel, setCurrentLabel] = useState("");

  const handleAddLabel = () => {
    if (currentLabel) {
      setLabels([...labels, currentLabel]);
      setCurrentLabel("");
    }
  };

  const handleInputChange = (e) => {
    setCurrentLabel(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddLabel();
    }
  };

  const handleRemoveLabel = (label) => {
    const newLabels = labels.filter((l) => l !== label);
    setLabels(newLabels);
  };
  const handleDone = () => {
    setStep(2);
  };

  return (
    <div className={styles.labelCreatorContainer}>
      <h1 className={styles.title}>Add your axes</h1>
      <div className={styles.labelInputWrapper}>
        <TextField
          variant="outlined"
          type="text"
          value={currentLabel}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <Button variant="outlined" onClick={handleAddLabel}>
          Add axis
        </Button>
      </div>

      {labels &&
        labels.map((label, index) => (
          <div className={styles.labelRow} key={index}>
            <p className={styles.label}>{label}</p>
            <IconButton
              aria-label="delete"
              onClick={() => handleRemoveLabel(label)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      <Button
        variant="outlined"
        onClick={handleDone}
        style={{
          marginTop: "auto",
        }}
      >
        Done
      </Button>
    </div>
  );
}
