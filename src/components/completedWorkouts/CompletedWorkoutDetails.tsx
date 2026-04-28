import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { useCompletedWorkouts } from "../../hooks/useCompletedWorkouts";
import Stack from "@mui/material/Stack";
import CompletedGroupCard from "./components/CompletedGroupCard";
import CompletedWorkoutStats from "./components/CompletedWorkoutStats";
import VerticalIconMenu from "../layout/VerticalIconMenu";
import useActiveWorkout from "../../hooks/useActiveWorkout";
import type Workout from "../../types/workout";
import { populateKey } from "../../types/keyId";
import type ExerciseSet from "../../types/exerciseSet";
import MuscleSummaryChart from "./components/MuscleSummaryChart";
import { devConsole } from "../../utils/debugLogger";
import { useState } from "react";
import LoadingIcon from "../layout/LoadingIcon";

export default function CompletedWorkoutDetails() {
  const id = Number(useParams().id);
  const { services } = useCompletedWorkouts();
  const { dispatch, workout: activeWorkout } = useActiveWorkout();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  devConsole(id);
  const workout = deleting ? null : services.getCompletedWorkoutById(id);

  const menuItems = [
    {
      label: "Redo",
      handleClick: () => {
        if (!workout) return;
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
      handleClick: () => {
        if (!workout) return;
        const copiedWorkout: Workout = {
          id: 0,
          name: workout.name + ' (Copy)',
          description: workout.description,
          exerciseGroups: workout.completedExerciseGroups.map((g, i) => {
            const exerciseSets: ExerciseSet[] = g.completedExerciseSets.map((s, i) => {
              s = populateKey(s)
              return {
                id: 0,
                key: s.key,
                minReps: s.minReps,
                maxReps: s.maxReps,
                sort: i,
                setTagId: s.setTagId,
                exerciseGroupId: 0,
              }
            });
            g = populateKey(g);
            return {
              id: 0,
              exerciseId: g.exerciseId,
              sort: i,
              key: g.key,
              workoutId: 0,
              exerciseSets
            };
          })
        }
        navigate('/workouts/create', { state: copiedWorkout });
      },
    },
    {
      label: "Delete",
      handleClick: () => {
        if (!workout || !workout.id) {
          return;
        }
        setDeleting(true);
        services.remove(workout.id, {
          onSuccess: () => {
            navigate('/completedWorkouts');
          }
        });
      },
      sx: { color: 'error.main' }
    },
  ];

  return (
    <Box className="w-full md:w-2/3 border-x border-blue-100" sx={{ mt: 1, px: 1 }}>
      {deleting
        ? <Box position="fixed" sx={{ zIndex: 99, width: '100%', height: '100%' }}>
          <LoadingIcon />
        </Box>
        : <>
          <Stack
            direction="row"
            spacing={0}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="h2">
              {workout!.name}
            </Typography>
            <VerticalIconMenu
              buttonId={"completed-workout-options"}
              menuItems={menuItems}
              size="medium"
            />
          </Stack>
          <CompletedWorkoutStats workout={workout!} />
          <Stack spacing={0}>
            {workout!.completedExerciseGroups.map(group => (
              <CompletedGroupCard key={group.id} group={group} />
            ))}
          </Stack>
          <MuscleSummaryChart groups={workout!.completedExerciseGroups} />
        </>
      }
    </Box>
  );
}