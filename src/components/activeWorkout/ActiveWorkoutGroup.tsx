import { useParams } from "react-router-dom";
import useActiveWorkout from "../../hooks/useActiveWorkout";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ActiveGroupExerciseCard from "./components/ActiveGroupExerciseCard";
import ActiveGroupSetsCard from "./components/ActiveGroupSetsCard";
import ActiveSetInputsMobile from "./components/ActiveSetInputsMobile";
import ActiveWorkoutGroupNavbar from "./components/ActiveWorkoutGroupNavbar";
import ActiveExerciseHistoryList from "./components/ActiveExerciseHistoryList";
import ActiveSetInputs from "./components/ActiveSetInputs";
import { Suspense, useState } from "react";
import LoadingIcon from "../layout/LoadingIcon";
import type ActiveExerciseSet from "../../types/activeExerciseSet";
import type { CompletedExerciseSet } from "../../types/completedExerciseSet";

export default function ActiveWorkoutGroup() {
  const { key } = useParams();
  const { workout } = useActiveWorkout();
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));
  const exerciseGroup = workout?.exerciseGroups.find(g => g.key === key);
  const currentIndex = exerciseGroup?.exerciseSets.findIndex(s => !s.completed) ?? -1;
  const currentSet = currentIndex > -1 ? exerciseGroup?.exerciseSets[currentIndex] : undefined;
  const [values, setValues] = useState<ActiveExerciseSet | undefined>(currentSet);
  const allSetsCompleted = currentIndex === -1;

  if (!workout) {
    return (<Typography>No workout selected</Typography>);
  }

  if (!exerciseGroup) {
    throw new Error('Workout does not contain exercise group with key: ' + key);
  }

  const copyCompletedSet = (completedSet: CompletedExerciseSet | ActiveExerciseSet) => {
    if (values) {
      const { reps, weight, setTagId } = completedSet;
      const newSet: ActiveExerciseSet = {
        ...values,
        reps,
        weight,
        setTagId
      }
      setValues(newSet);
    }
  }


  return (
    <Box className="w-full md:w-2/3" sx={{ mt: 2 }}>
      <ActiveWorkoutGroupNavbar />
      <Box mb='30vh'>
        <Stack spacing={1} sx={{ px: 1 }}>
          <ActiveGroupExerciseCard exerciseGroup={exerciseGroup} />
          <ActiveGroupSetsCard
            exerciseGroup={exerciseGroup}
            onDoubleClick={copyCompletedSet}
          />
          <Suspense fallback={<LoadingIcon />}>
            <ActiveExerciseHistoryList
              exerciseId={exerciseGroup.exerciseId}
              onDoubleClick={copyCompletedSet}
              currentIndex={currentIndex}
            />
          </Suspense>
          {mobileScreen
            ? <ActiveSetInputsMobile
              exerciseGroup={exerciseGroup}
              setKey={currentSet?.key ?? ''}
              values={values}
              setValues={setValues}
              allSetsCompleted={allSetsCompleted}
              key={`${exerciseGroup.key}-${currentSet?.key ?? ''}`}
            />
            : <ActiveSetInputs
              exerciseGroup={exerciseGroup}
              setKey={currentSet?.key ?? ''}
              values={values}
              setValues={setValues}
              allSetsCompleted={allSetsCompleted}
              key={`${exerciseGroup.key}-${currentSet?.key ?? ''}`}
            />
          }
        </Stack>
      </Box>
    </Box>
  )
}