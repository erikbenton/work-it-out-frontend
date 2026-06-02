import { useNavigate, type NavigateFunction } from 'react-router-dom';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import type Exercise from '../../types/exercise';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import FilterExerciseButton from './components/ExerciseListFilter';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import { grey } from '@mui/material/colors';
import { useFilteredExercises } from '../../hooks/useFilteredExercises';
import { devConsole } from '../../utils/debugLogger';

export default function ExerciseList() {
  const { filteredExercises, filter, setFilter } = useFilteredExercises();
  const navigate = useNavigate();
  devConsole('filtered', filteredExercises.length)

  const handleAddExercise = () => {
    navigate("/exercises/create");
  }

  return (
    <Box className="w-full md:w-2/3 border-x border-blue-100" sx={{ mt: 1 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h2" sx={{ px: 1 }}>
          Exercises
        </Typography>
        <Stack direction='row' spacing={1}>
          <FilterExerciseButton
            initFilter={filter}
            setParentFilter={setFilter}
            color={grey[500]}
          />
          <IconButton color="primary" onClick={handleAddExercise}>
            <AddCircleOutlinedIcon fontSize="large" />
          </IconButton>
        </Stack>
      </Stack>
      <ExerciseSubheaderList exercises={filteredExercises} />
    </Box>
  );
}

type Props = {
  exercises: Exercise[]
}

function ExerciseSubheaderList({ exercises }: Props) {
  const navigate = useNavigate();
  const { height } = useWindowDimensions();

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

  const headerOffsetPixels = 122.98;

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: `${height - headerOffsetPixels}px`,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {sortedKeys.map((key) => (
        <li key={`exercises-${key}`}>
          <ul>
            <ListSubheader>{key}</ListSubheader>
            {(exerciseLetterMap.get(key) ?? []).map((exercise) => (
              <ListItemButton
                key={`item-${key}-${exercise.id}`}
                onClick={handleRowClick(exercise, navigate)}
              >
                <ListItem>
                  <ListItemText
                    primary={exercise.name}
                    secondary={`${exercise.muscles?.map(m => m.name).join(', ')}`}
                    sx={{ textTransform: 'capitalize' }}
                  />
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