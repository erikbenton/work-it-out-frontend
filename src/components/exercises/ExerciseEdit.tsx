import { useReducer } from "react";
import exerciseReducer from "../../reducers/exerciseReducer";
import { useExercises } from "../../hooks/useExercises";
import { useNavigate, useParams } from "react-router-dom";
import ExerciseForm from "./components/ExerciseForm";
import ErrorMessage from "../layout/ErrorMessage";

export default function ExerciseEdit() {
  const id = Number(useParams().id)
  const { services } = useExercises();
  const initExercise = services.getExerciseById(id);
  const [exercise, dispatch] = useReducer(exerciseReducer, initExercise);
  const navigate = useNavigate();

  const handleSubmit = () => {
    services.update(
      { ...exercise },
      { onSuccess: (savedExercise) => navigate(`/exercises/${savedExercise.id}`) }
    );
  }

  // TODO: No exercise, return Error message
  if (!id || exercise.id === 0) {
    return (<ErrorMessage message={`No exercise was found with the id: ${id}`} />);
  }

  return (
    <ExerciseForm
      exercise={exercise}
      dispatch={dispatch}
      handleSubmit={handleSubmit}
    />
  );
}