import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import ExpandMoreButton from '../../layout/ExpandMoreButton';
import { bgBlue, bgDarkBlue } from '../../../utils/styling';
import useProgramForm from '../../../hooks/useProgramForm';
import type Workout from '../../../types/workout';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import VerticalIconMenu from '../../layout/VerticalIconMenu';
import Typography from '@mui/material/Typography';
import { checkPluralization } from '../../../utils/formatters';
import List from '@mui/material/List';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import type ExerciseGroup from '../../../types/exerciseGroup';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { useExercises } from '../../../hooks/useExercises';
import { Suspense } from 'react';
import LoadingIcon from '../../layout/LoadingIcon';

type Props = {
  workout: Workout
}

export default function ProgramWorkoutCard({ workout }: Props) {
  const { expanded, handleExpandClick } = useProgramForm();
  const isExpanded = expanded.get(workout.id) ?? false;

  return (
    <Card sx={{ width: '100%', bgcolor: bgBlue, borderRadius: 5 }}>
      <ProgramWorkoutCardTitle workout={workout} />
      <CardActions disableSpacing>
        <ExpandMoreButton
          expand={isExpanded}
          handleExpandClick={handleExpandClick(isExpanded, workout.id)}
          ariaLabel="show workout details"
          className='mx-auto '
        />
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent className='pt-0 pb-1'>
          <Stack spacing={1}>
            <ProgramWorkoutExercises workout={workout} />
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}

type CardProps = {
  workout: Workout
}

function ProgramWorkoutCardTitle({ workout }: CardProps) {
  const { editing, dispatch } = useProgramForm();

  const numberOfExercises = workout.exerciseGroups.length;

  const menuItems = [
    {
      label: "Shift up",
      handleClick: () => {
        dispatch({ type: 'shiftWorkout', payload: { workoutId: workout.id, shift: -1 } });
      },
    },
    {
      label: "Shift down",
      handleClick: () => {
        dispatch({ type: 'shiftWorkout', payload: { workoutId: workout.id, shift: 1 } });
      },
    },
    {
      label: "Delete",
      handleClick: () => {
        dispatch({ type: 'removeWorkout', payload: { workoutId: workout.id } });
      },
      sx: { color: 'error.main' }
    },
  ];

  return (
    <CardHeader
      sx={{ overflow: 'hidden' }}
      avatar={
        <Avatar sx={{ bgcolor: bgDarkBlue }} aria-label="workout group">
          {workout.name[0].toUpperCase()}
        </Avatar>
      }
      action={
        <Grow in={editing}>
          <Box>
            <VerticalIconMenu
              buttonId={workout.name.split(' ').join('-').toLowerCase() + "-group-options"}
              menuItems={menuItems}
            />
          </Box>
        </Grow>
      }
      title={workout.name}
      subheader={
        <Typography>
          {`${numberOfExercises} ${checkPluralization('Exercise', numberOfExercises)}`}
        </Typography>}
      slotProps={{ title: { variant: 'h6' } }}
      className='pb-0'
    />
  );
}

type CardExercisesProp = {
  workout: Workout
}

function ProgramWorkoutExercises({ workout }: CardExercisesProp) {

  return (
    <Suspense fallback={<LoadingIcon label='Exercises' />}>
      <List dense={true} sx={{ pt: 0 }}>
        <TransitionGroup>
          {workout.exerciseGroups.map(group => (
            <Collapse key={group.id} >
              <ProgramExerciseGroupItem key={workout.id} group={group} />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Suspense>
  );
}

type CardExerciseGroupProp = {
  group: ExerciseGroup
}

function ProgramExerciseGroupItem({ group }: CardExerciseGroupProp) {
  const { services: exerciseServices } = useExercises();
  const exercise = exerciseServices.getExerciseById(group.exerciseId);
  const muscleAvatar = exercise.muscles
    ? exercise.muscles[0].name[0].toUpperCase()
    : "?";
  const muscleColor = exercise.muscles
    ? exercise.muscles[0].colorRgb
    : "red";
  const numberOfSets = group.exerciseSets.length;

  return (
    <ListItem
      disableGutters
      key={group.id}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: muscleColor ?? 'red' }} aria-label="exercise group">
          {muscleAvatar}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant='h6'>
            {exercise.name}
          </Typography>
        }
        secondary={
          `${exercise.category} - ${numberOfSets} Sets`
        }
        slotProps={{ secondary: { sx: { textTransform: 'capitalize' } } }}
      />
    </ListItem>
  )
}