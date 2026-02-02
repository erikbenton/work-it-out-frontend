import { Box, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type Workout from "../../types/Workout";
import LoadingMessage from "../layout/LoadingMessage";
import { getWorkoutById } from "../../requests/workouts";
import ExerciseGroupCard from "./components/ExerciseGroupCard";
import { useState } from "react";
import WorkoutDetailsTitle from "./components/WorkoutDetailsTitle";
import ErrorMessage from "../layout/ErrorMessage";

export default function WorkoutDetails() {
  const [editing, setEditing] = useState(false);
  const id = Number(useParams().id)
  const { data: workout, isLoading } = useQuery<Workout>({
    queryKey: ['workout'],
    queryFn: () => getWorkoutById(id)
  });
  const [expanded, setExpanded] = useState<boolean[]>(
    new Array(workout?.exerciseGroups.length ?? 0).fill(false));

  const handleExpandClick = (expanded: boolean, index: number) => {
    return () => {
      setExpanded(prev => {
        prev[index] = !expanded;
        return [...prev];
      })
    }
  }

  if (isLoading) {
    return (<LoadingMessage dataName='workouts' />);
  }

  if (!workout) {
    return (<ErrorMessage message={`Unable to find workout with id: ${id}`} />)
  }

  return (
    <Box className="w-full md:w-2/3 px-3" role={editing ? 'form' : 'div'}>
      <WorkoutDetailsTitle workout={workout} editing={editing} setEditing={setEditing} />
      <Stack spacing={1} className="pb-3" >
        {workout.exerciseGroups.map((group, index) => (
          <ExerciseGroupCard
            key={group.id}
            exerciseGroup={group}
            isEditing={editing}
            expanded={expanded[index]}
            handleExpandClick={handleExpandClick(expanded[index], index)}
          />
        ))}
      </Stack>
    </Box>
  );
}