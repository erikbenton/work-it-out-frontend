import CardHeader from "@mui/material/CardHeader";
import useActiveWorkout from "../../../hooks/useActiveWorkout";
import { useExercises } from "../../../hooks/useExercises";
import type ActiveExerciseGroup from "../../../types/activeExerciseGroup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";

type Props = {
  exerciseGroup: ActiveExerciseGroup
}

export default function ActiveWorkoutGroupCard({ exerciseGroup }: Props) {
  const { dispatch } = useActiveWorkout();
  const { services } = useExercises();
  const navigate = useNavigate();
  const exercise = services.getExerciseById(exerciseGroup.exerciseId);
  const muscleAvatar = exercise.muscles
    ? exercise.muscles[0].name[0].toUpperCase()
    : "?";
  const numberOfSets = exerciseGroup.exerciseSets?.length ?? 0;

  const menuItems = [
    {
      label: "View exercise",
      handleClick: () => {
        navigate(`/exercises/${exerciseGroup.exerciseId}`)
      },
    },
    {
      label: "Shift up",
      handleClick: () => {
        dispatch({ type: 'shiftGroup', payload: { group: exerciseGroup, shift: -1 } });
      },
    },
    {
      label: "Shift down",
      handleClick: () => {
        dispatch({ type: 'shiftGroup', payload: { group: exerciseGroup, shift: 1 } });
      },
    },
    {
      label: "Delete",
      handleClick: () => {
        dispatch({ type: 'removeGroup', payload: { group: exerciseGroup } });
      },
      sx: { color: 'error.main' }
    },
  ];

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        sx={{ overflow: 'hidden' }}
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="exercise group">
            {muscleAvatar}
          </Avatar>
        }
        action={
          <Box>
            <VerticalIconMenu
              buttonId={exercise.name?.split(' ').join('-').toLowerCase() + "-group-options"}
              menuItems={menuItems}
            />
          </Box>
        }
        title={
          <Link className="block min-w-[80%] w-fit" to={`/activeWorkout/${exerciseGroup.key}`}>
            {exercise.name}
          </Link>
        }
        subheader={`${numberOfSets} Sets`}
        slotProps={{ title: { variant: 'h6' } }}
      />
    </Card>
  );
}