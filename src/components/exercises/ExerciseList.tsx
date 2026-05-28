import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { useExercises } from '../../hooks/useExercises';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import type Exercise from '../../types/exercise';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { capitalize } from '../../utils/formatters';
import { useMemo, useState } from 'react';
import { devConsole } from '../../utils/debugLogger';
import FilterExerciseButton, { type ExerciseFilterConfig } from './components/ExerciseListFilter';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';

export default function ExerciseList() {
  const { exercises } = useExercises();
  const [filter, setFilter] = useState<ExerciseFilterConfig>({});
  const navigate = useNavigate();

  const filteredExercises = useMemo(() => {
    devConsole('running exercise filter memo');
    return exercises
      .filter(ex => {
        let keep = true;
        if (filter.name) {
          if (!ex.name) return false;
          keep = ex.name.toLocaleLowerCase().includes(filter.name);
        }

        if (keep && filter.categories && filter.categories.length) {
          keep = filter.categories.includes(ex.category);
        }

        if (keep && filter.muscles && filter.muscles.length) {
          if (!ex.muscles || !ex.muscles.length) return false;
          keep = ex.muscles.reduce((acc, curr) => acc || (filter.muscles?.includes(curr.name) ?? false), false);
        }

        if (keep && filter.equipment && filter.equipment.length) {
          if (!ex.equipment) return false;
          keep = filter.equipment.includes(ex.equipment);
        }
        return keep;
      });
  }, [filter, exercises])

  const handleAddExercise = () => {
    navigate("/exercises/create");
  }

  const isFilterSet = Boolean(filter.name || filter.categories || filter.muscles || filter.equipment);

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
          <FilterExerciseButton initFilter={filter} setParentFilter={setFilter} isParentFilterSet={isFilterSet} />
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
                    secondary={`${exercise.muscles?.map(m => capitalize(m.name)).join(', ')}`}
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