import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import VerticalIconMenu from '../../layout/VerticalIconMenu';
import { useNavigate } from 'react-router-dom';
import { useExercises } from '../../../hooks/useExercises';
import type Exercise from '../../../types/exercise';

type Props = {
  exercise: Exercise
}

export default function ExerciseDetailsTitle({ exercise }: Props) {
  const { services } = useExercises();
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "New",
      handleClick: () => navigate("/exercises/create"),
    },
    {
      label: "Edit",
      handleClick: () => navigate(`/exercises/${exercise.id}/edit`),
    },
    {
      label: "Delete",
      handleClick: () => {
        services.remove(exercise);
        navigate('/exercises');
      },
      sx: { color: 'error.main' }
    },
  ];

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="h2">
        {exercise.name}
      </Typography>
      <VerticalIconMenu
        buttonId='exercise-menu-button'
        menuItems={menuItems}
        size='large'
      />
    </Stack>
  );
}