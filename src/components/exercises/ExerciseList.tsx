import { Box, ListItemButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { useExercises } from '../../hooks/useExercises';

export default function ExerciseList() {
  const { exercises } = useExercises();

  return (
    <Box className="w-full md:w-2/3 mt-3">
      <Typography variant="h4" component="h2">
        Exercises
      </Typography>
      <ExerciseSubheaderList exercises={exercises} />
    </Box>
  );
}

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import type Exercise from '../../types/exercise';

type Props = {
  exercises: Exercise[]
}

function ExerciseSubheaderList({ exercises }: Props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleRowClick = (exercise: Exercise, navigate: NavigateFunction) => {
    return () => {
      navigate(`/exercises/${exercise.id}`);
    }
  }

  const exerciseLetterMap = new Map<string, Exercise[]>();
  const keys: string[] = [];
  exercises.forEach(exer => {
    const letter = exer.name ? exer.name[0].toUpperCase() : '';
    const entry = exerciseLetterMap.get(letter);
    if (entry) {
      exerciseLetterMap.set(letter, entry.concat(exer));
    } else {
      exerciseLetterMap.set(letter, [exer]);
      keys.push(letter);
    }
  });

  const sortedKeys = keys.sort();

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: mobileScreen ? '87vh' : '91vh',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {sortedKeys.map((key) => (
        <li key={`exercises-${key}`}>
          <ul>
            <ListSubheader>{key}</ListSubheader>
            {(exerciseLetterMap.get(key) ?? []).map((exercise) => (
              <ListItemButton key={`item-${key}-${exercise.id}`} onClick={handleRowClick(exercise, navigate)}>
                <ListItem>
                  <ListItemText primary={exercise.name} />
                </ListItem>
              </ListItemButton>
            ))}

          </ul>
        </li>
      ))}
      <ListItem sx={{ my: 2 }}></ListItem>
    </List>
  );
}