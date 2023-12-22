import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";

export const CreatePage = () => {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("lbs");
  const [date, setDate] = useState("");

  const history = useHistory();

  const createExercise = async () => {
    const newExercise = { name, reps, weight, unit, date };
    const response = await fetch("/exercises", {
      method: "POST",
      body: JSON.stringify(newExercise),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 201) {
      alert("Successfully created exercise");
    } else {
      alert(`Failed to add exercise, status code = ${response.status}`);
    }
    history.push("/");
  };

  return (
    <div className="App">
      <h2>Create Exercise</h2>
      <input
        type="text"
        placeholder="Exercise name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        min="1"
        placeholder="# of reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <input
        type="number"
        min="1"
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="lbs">lbs</option>
        <option value="kgs">kgs</option>
      </select>
      <input
        type="text"
        placeholder="Date (MM-DD-YY)"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={createExercise}>Create</button>
    </div>
  );
};

export default CreatePage;
