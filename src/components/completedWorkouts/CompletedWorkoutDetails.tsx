import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { useCompletedWorkouts } from "../../hooks/useCompletedWorkouts";
import Stack from "@mui/material/Stack";
import CompletedGroupCard from "./components/CompletedGroupCard";
import CompletedWorkoutStats from "./components/CompletedWorkoutStats";
import VerticalIconMenu from "../layout/VerticalIconMenu";
import useActiveWorkout from "../../hooks/useActiveWorkout";

export default function CompletedWorkoutDetails() {
  const id = Number(useParams().id);
  const { services } = useCompletedWorkouts();
  const { dispatch, workout: activeWorkout } = useActiveWorkout();
  const navigate = useNavigate();
  const workout = services.getCompletedWorkoutById(id);

  const menuItems = [
    {
      label: "Redo",
      handleClick: () => {
        dispatch({
          type: 'redoWorkout',
          payload: { completedWorkout: workout }
        });
        navigate('/activeWorkout');
      },
      disabled: (activeWorkout !== null)
    },
    {
      label: "Save as...",
      handleClick: () => { },
    },
    {
      label: "Delete",
      handleClick: () => {
        services.remove(workout, () => {
          navigate('/completedWorkouts');
        });
      },
      sx: { color: 'error.main' }
    },
  ];

  return (
    <Box className="w-full md:w-2/3" sx={{ mt: 1, px: 1 }}>
      <Stack
        direction="row"
        spacing={0}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h2">
          {workout.name}
        </Typography>
        <VerticalIconMenu
          buttonId={"completed-workout-options"}
          menuItems={menuItems}
          size="medium"
        />
      </Stack>
      <CompletedWorkoutStats workout={workout} />
      <Stack spacing={0}>
        {workout.completedExerciseGroups.map(group => (
          <CompletedGroupCard key={group.id} group={group} />
        ))}
      </Stack>
    </Box>
  );
}