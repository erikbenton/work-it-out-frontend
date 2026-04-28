import { useParams } from "react-router-dom";
import useActiveWorkout from "../../hooks/useActiveWorkout";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ActiveGroupExerciseCard from "./components/ActiveGroupExerciseCard";
import ActiveGroupSetsCard from "./components/ActiveGroupSetsCard";
import ActiveWorkoutGroupNavbar from "./components/ActiveWorkoutGroupNavbar";
import ActiveExerciseHistoryList from "./components/ActiveExerciseHistoryList";
import { Suspense, useState } from "react";
import LoadingIcon from "../layout/LoadingIcon";
import type ActiveExerciseSet from "../../types/activeExerciseSet";
import type { CompletedExerciseSet } from "../../types/completedExerciseSet";
import ActiveSetsInputs from "./components/ActiveSetsInputs";
import ExerciseSelect from "../exercises/components/ExerciseSelect";

export default function ActiveWorkoutGroup() {
  const { key } = useParams();
  const { workout, dispatch, saving, setTimerAppeared, setTimerOffset } = useActiveWorkout();
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));
  const exerciseGroup = workout?.exerciseGroups.find(g => g.key === key);
  const currentIndex = exerciseGroup?.exerciseSets.findIndex(s => !s.completed) ?? -1;
  const currentSet = currentIndex > -1 ? exerciseGroup?.exerciseSets[currentIndex] : undefined;
  const [values, setValues] = useState<ActiveExerciseSet | undefined>(currentSet);
  const [replacingExercise, setReplacingExercise] = useState(false);
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

  const completeSet = (completedSet: ActiveExerciseSet) => {
    dispatch({
      type: 'updateSet',
      payload: {
        group: exerciseGroup,
        set: { ...completedSet, key: currentSet?.key, completed: true }
      }
    });
    dispatch({
      type: 'updateRestTime',
      payload: { startTime: Date.now(), duration: exerciseGroup.restTime }
    });
    setTimerAppeared(false);
    setTimerOffset(0);
    if (currentIndex < exerciseGroup?.exerciseSets.length - 1) {
      const nextSet = exerciseGroup?.exerciseSets[currentIndex + 1];
      // keep the weight and reps but update everything else
      setValues({ ...nextSet, weight: completedSet.weight, reps: completedSet.reps })
    }
  }

  const replaceExercise = (exercises: number[]) => {
    if (exercises.length > 0) {
      const updatedExerciseId = exercises[0];
      dispatch({
        type: 'updateGroup',
        payload: { group: { ...exerciseGroup, exerciseId: updatedExerciseId } }
      });
    }
  }

  if (replacingExercise) {
    return (
      <ExerciseSelect
        open={replacingExercise}
        setOpen={setReplacingExercise}
        addExercises={replaceExercise}
        limit={1}
      />
    );
  }

  return (
    <>
      {saving &&
        <Box position="fixed" sx={{ zIndex: 99, width: '100%', height: '100%' }}>
          <LoadingIcon />
        </Box>
      }
      <Box className="w-full md:w-2/3 h-full" sx={{ mt: 2, opacity: saving ? 0.5 : undefined }}>
        <ActiveWorkoutGroupNavbar />
        <Box minHeight='100%'>
          <Box pb="20vh">
            <Stack spacing={1} sx={{ px: 1 }}>
              <ActiveGroupExerciseCard
                exerciseGroup={exerciseGroup}
                setReplacingExercise={setReplacingExercise}
              />
              <ActiveGroupSetsCard
                exerciseGroup={exerciseGroup}
                onDoubleClick={copyCompletedSet}
                setValues={setValues}
                allSetsCompleted={allSetsCompleted}
              />
              <Suspense fallback={<LoadingIcon />}>
                <ActiveExerciseHistoryList
                  exerciseId={exerciseGroup.exerciseId}
                  onDoubleClick={copyCompletedSet}
                  currentIndex={currentIndex}
                />
              </Suspense>
            </Stack>
          </Box>
        </Box>
      </Box>
      <ActiveSetsInputs
        exerciseGroup={exerciseGroup}
        values={values}
        setValues={setValues}
        allSetsCompleted={allSetsCompleted}
        key={`${exerciseGroup.key}-${currentSet?.key ?? ''}`}
        completeSet={completeSet}
        size={mobileScreen ? 'small' : 'large'}
      />
    </>
  )
}