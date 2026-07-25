import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CompletedGroupCard from "./CompletedGroupCard";
import CompletedWorkoutStats from "./CompletedWorkoutStats";
import VerticalIconMenu, { type VerticalMenuItemProps } from "../../layout/VerticalIconMenu";
import MuscleSummaryChart from "./MuscleSummaryChart";
import LoadingIcon from "../../layout/LoadingIcon";
import type CompletedWorkout from "../../../types/completedWorkout";
import useCompletedWorkoutForm from "../../../hooks/useCompletedWorkoutForm";

export default function CompletedWorkoutForm() {
  const { workout, saving, menuItems } = useCompletedWorkoutForm();

  return (
    <>
      {saving &&
        <Box position="fixed" sx={{ zIndex: 99, width: '100%', height: '100%' }}>
          <LoadingIcon />
        </Box>
      }
      <Box
        className="w-full md:w-2/3 border-x border-blue-100"
        sx={{
          mt: 1,
          minHeight: `calc(100dvh - 64px - 8px)`,
          opacity: saving ? 0.5 : undefined
        }}
      >
        <CompletedWorkoutInfo workout={workout!} menuItems={menuItems} />
        <Box sx={{ height: '10vh', minHeight: '10vh' }}></Box>
      </Box>
    </>
  );
}

type CompletedWorkoutProps = {
  workout: CompletedWorkout,
  menuItems?: VerticalMenuItemProps[]
}

function CompletedWorkoutInfo({ workout, menuItems }: CompletedWorkoutProps) {

  return (
    <>
      <Stack
        direction="row"
        spacing={0}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          px: 1
        }}
      >
        <Typography variant="h5" component="h2">
          {workout.name}
        </Typography>
        <VerticalIconMenu
          buttonId={"completed-workout-options"}
          menuItems={menuItems ?? []}
          size="medium"
        />
      </Stack>
      <CompletedWorkoutStats workout={workout!} />
      <Stack spacing={0}>
        {workout.completedExerciseGroups.map(group => (
          <CompletedGroupCard key={group.id} group={group} />
        ))}
      </Stack>
      <MuscleSummaryChart groups={workout.completedExerciseGroups} />
    </>
  )
}