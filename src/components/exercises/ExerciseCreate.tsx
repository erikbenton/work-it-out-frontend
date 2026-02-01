import { useReducer } from "react";
import exerciseReducer, { initialExercise } from "../../reducers/exerciseReducer";
import { useExercises } from "../../hooks/useExercises";
import { useNavigate } from "react-router-dom";
import ExerciseForm from "./components/ExerciseForm";

export default function ExerciseCreate() {
  const [exercise, dispatch] = useReducer(exerciseReducer, initialExercise);
  const { services } = useExercises();
  const navigate = useNavigate();

  const handleSubmit = () => {
    services.create(
      { ...exercise },
      {
        onSuccess: (savedExercise) => {
          navigate(`/exercises/${savedExercise.id}`)
        }
      }
    );
  }

  return (
    <ExerciseForm
      exercise={exercise}
      dispatch={dispatch}
      handleSubmit={handleSubmit}
    />
  );
}