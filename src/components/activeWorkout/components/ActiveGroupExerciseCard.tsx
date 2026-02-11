import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import useActiveWorkout from "../../../hooks/useActiveWorkout";
import { useExercises } from "../../../hooks/useExercises";
import { Link } from "react-router-dom";
import type ActiveExerciseGroup from "../../../types/activeExerciseGroup";

type Props = {
  exerciseGroup: ActiveExerciseGroup
}

export default function ActiveGroupExerciseCard({ exerciseGroup }: Props) {
  const { dispatch } = useActiveWorkout();
  const { services } = useExercises();
  const exercise = services.getExerciseById(exerciseGroup.exerciseId);
  const muscleAvatar = exercise.muscles
    ? exercise.muscles[0].name[0].toUpperCase()
    : "?";
  const numberOfSets = exerciseGroup.exerciseSets?.length ?? 0;
  const numberCompleted = exerciseGroup.exerciseSets.filter(s => s.completed).length;

  const menuItems = [
    {
      label: "Replace",
      handleClick: () => {
        return;
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
          <Link to={`/exercises/${exercise.id}`} className="block min-w-[80%] w-fit">
            {exercise.name}
          </Link>
        }
        subheader={`${numberCompleted}/${numberOfSets} Sets done`}
        slotProps={{ title: { variant: 'h6' } }}
      />
    </Card>
  );
}