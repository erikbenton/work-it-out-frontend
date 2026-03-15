import { useParams } from "react-router-dom";
import useActiveWorkout from "../../hooks/useActiveWorkout";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ActiveGroupExerciseCard from "./components/ActiveGroupExerciseCard";
import ActiveGroupSetsCard from "./components/ActiveGroupSetsCard";
import ActiveSetInputsMobile from "./components/ActiveSetInputsMobile";
import ActiveWorkoutGroupNavbar from "./components/ActiveWorkoutGroupNavbar";
import ActiveExerciseHistoryList from "./components/ActiveExerciseHistoryList";
import ActiveSetInputs from "./components/ActiveSetInputs";

export default function ActiveWorkoutGroup() {
  const { key } = useParams();
  const { workout } = useActiveWorkout();
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (!workout) {
    return (<Typography>No workout selected</Typography>);
  }

  const exerciseGroup = workout?.exerciseGroups.find(g => g.key === key);
  if (!exerciseGroup) {
    throw new Error('Workout does not contain exercise group with key: ' + key);
  }

  const currentSet = exerciseGroup?.exerciseSets.find(s => !s.completed);

  return (
    <Box className="w-full md:w-2/3" sx={{ mt: 2 }}>
      <ActiveWorkoutGroupNavbar />
      <Stack spacing={1} sx={{ px: 1 }}>
        <ActiveGroupExerciseCard exerciseGroup={exerciseGroup} />
        <ActiveGroupSetsCard exerciseGroup={exerciseGroup} />
        <ActiveExerciseHistoryList exerciseId={exerciseGroup?.exerciseId} />
        {mobileScreen
          ? <ActiveSetInputsMobile
            exerciseGroup={exerciseGroup}
            set={currentSet}
            key={`${exerciseGroup.key}-${currentSet?.key ?? ''}`}
          />
          : <ActiveSetInputs
            exerciseGroup={exerciseGroup}
            set={currentSet}
            key={`${exerciseGroup.key}-${currentSet?.key ?? ''}`}
          />
        }
      </Stack>
    </Box>
  )
}