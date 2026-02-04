import { Box, Stack } from "@mui/material";
import ExerciseGroupCard from "../components/ExerciseGroupCard";
import { useReducer, useState } from "react";
import WorkoutDetailsTitle from "../components/WorkoutDetailsTitle";
import type Workout from "../../../types/workout";
import workoutReducer from "../../../reducers/workoutReducer";

type Props = {
  initWorkout: Workout
}

export default function WorkoutForm({ initWorkout }: Props) {
  const [ workout, dispatch ] = useReducer(workoutReducer, initWorkout );
  const [editing, setEditing] = useState(false);
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
            dispatch={dispatch}
          />
        ))}
      </Stack>
    </Box>
  );
}