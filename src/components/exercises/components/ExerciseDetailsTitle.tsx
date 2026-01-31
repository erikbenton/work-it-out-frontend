import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import VerticalIconMenu from '../../layout/VerticalIconMenu';

type Props = {
  exerciseName: string
}

export default function ExerciseDetailsTitle({ exerciseName }: Props) {


  const menuItems = [
    { label: "New", handleClick: () => {}, },
    { label: "Edit", handleClick: () => {}, },
    { label: "Delete", handleClick: () => {}, sx: { color: 'error.main' } },
  ]

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
        {exerciseName}
      </Typography>
      <VerticalIconMenu
        buttonId='exercise-menu-button'
        menuItems={menuItems}
        size='large'
      />
    </Stack>
  );
}