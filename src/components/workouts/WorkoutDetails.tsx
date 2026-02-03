import { Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import ExerciseGroupCard from "./components/ExerciseGroupCard";
import { useState } from "react";
import WorkoutDetailsTitle from "./components/WorkoutDetailsTitle";
import { useWorkouts } from "../../hooks/useWorkouts";

export default function WorkoutDetails() {
  const [editing, setEditing] = useState(false);
  const id = Number(useParams().id)
  const { services } = useWorkouts();
  const workout = services.getWorkoutById(id);
  const [expanded, setExpanded] = useState<boolean[]>(
    new Array(workout?.exerciseGroups.length ?? 0).fill(false));

  const handleExpandClick = (expanded: boolean, index: number) => {
    return () => {
      setExpanded(prev => {
        prev[index] = !expanded;
        return [...prev];
      });
    };
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