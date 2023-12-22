import ExerciseList from "../components/ExerciseList";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import "../App.css";

function HomePage({ setExerciseToEdit }) {
  const [exercises, setExercises] = useState([]);

  const history = useHistory();

  const onDelete = async (_id) => {
    const response = await fetch(`/exercises/${_id}`, { method: "DELETE" });
    if (response.status === 204) {
      setExercises(exercises.filter((m) => m._id !== _id));
    } else {
      console.error(
        `Failed to delete exercise with _id = ${_id}, status code = ${response.status}`
      );
    }
  };

  const onEdit = async (exerciseToEdit) => {
    setExerciseToEdit(exerciseToEdit);
    history.push("/edit");
  };

  const loadExercises = async () => {
    const response = await fetch("/exercises");
    const data = await response.json();
    setExercises(data);
  };

  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <div className="App">
      <h2>Exercises</h2>
      <ExerciseList
        exercises={exercises}
        onDelete={onDelete}
        onEdit={onEdit}
      ></ExerciseList>
      <div>
        <button className="Add-icon-button">
          <Link to="/create">
            <MdAdd className="Add-icon" />
          </Link>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
