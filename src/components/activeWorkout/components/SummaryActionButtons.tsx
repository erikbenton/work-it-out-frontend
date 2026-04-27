import Button from "@mui/material/Button";
import useActiveWorkout from "../../../hooks/useActiveWorkout"
import type ActiveWorkout from "../../../types/activeWorkout";
import { useCompletedWorkouts } from "../../../hooks/useCompletedWorkouts";

type Props = {
  workout: ActiveWorkout,
  handleAddingExercises: () => void
}
export default function SummaryActionButtons({ workout, handleAddingExercises }: Props) {
  const { complete, handleFinishWorkout } = useActiveWorkout();
  const { services } = useCompletedWorkouts();

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
          onClick={() => handleFinishWorkout(services)}
        >
          Finish Workout
        </Button>
        : <></>
  )
}