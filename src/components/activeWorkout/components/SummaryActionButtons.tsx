import Button from "@mui/material/Button";
import useActiveWorkout from "../../../hooks/useActiveWorkout"
import type ActiveWorkout from "../../../types/activeWorkout";
import type { CompletedWorkoutServices } from "../../../hooks/useCompletedWorkouts";

type Props = {
  workout: ActiveWorkout,
  handleAddingExercises: () => void,
  handleFinishWorkout: (services: CompletedWorkoutServices) => void
}
export default function SummaryActionButtons({ workout, handleAddingExercises, handleFinishWorkout }: Props) {
  const { complete } = useActiveWorkout();

  return (
    workout.exerciseGroups.length === 0
      ? <Button
        sx={{ textTransform: 'none', borderRadius: 5 }}
        variant="outlined"
        onClick={handleAddingExercises}
      >
        Add exercises
      </Button>
      : complete
        ? <Button
          sx={{ textTransform: 'none', borderRadius: 5 }}
          variant="contained"
          onClick={() => handleFinishWorkout}
        >
          Finish Workout
        </Button>
        : <></>
  )
}