import { useParams } from "react-router-dom";
import useActiveWorkout from "../../hooks/useActiveWorkout";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import ActiveGroupExerciseCard from "./components/ActiveGroupExerciseCard";
import ActiveGroupSetsCard from "./components/ActiveGroupSetsCard";
import ActiveSetInputsMobile from "./components/ActiveSetInputsMobile";

export default function ActiveWorkoutGroup() {
  const { key } = useParams();
  const { workout } = useActiveWorkout();
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));
  const exerciseGroup = workout?.exerciseGroups.find(g => g.key === key);
  const currentSet = exerciseGroup?.exerciseSets.find(s => !s.completed);

  if (!exerciseGroup || !currentSet) {
    throw new Error('Workout does not contain exercise group with key: ' + key);
  }

  return (
    <Box className="w-full md:w-2/3">
      <Stack spacing={1} sx={{ px: 1 }}>
        {/* Exercise card */}
        <ActiveGroupExerciseCard exerciseGroup={exerciseGroup} />
        {/* current group */}
        <ActiveGroupSetsCard exerciseGroup={exerciseGroup} />
        {/* history */}
        {mobileScreen &&
          <ActiveSetInputsMobile exerciseGroup={exerciseGroup} set={currentSet} />
        }
      </Stack>
    </Box>
  )
}