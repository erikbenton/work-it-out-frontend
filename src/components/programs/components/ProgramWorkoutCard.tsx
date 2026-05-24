import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import ExpandMoreButton from '../../layout/ExpandMoreButton';
import { bgBlue } from '../../../utils/styling';
import useProgramForm from '../../../hooks/useProgramForm';
import type Workout from '../../../types/workout';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
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
import type Exercise from '../../../types/exercise';
import { getMaxMuscleForExercises } from '../../../utils/muscles';
import { Link } from 'react-router-dom';

type PopulatedGroup = ExerciseGroup & { exercise: Exercise }
type PopulatedWorkout = Workout & { populatedGroups: PopulatedGroup[] }

type Props = {
  workout: Workout
}

export default function ProgramWorkoutCard({ workout }: Props) {
  const { expanded, handleExpandClick } = useProgramForm();
  const isExpanded = expanded.get(workout.id) ?? false;
  const { services: exerciseServices } = useExercises();
  const populatedGroups: PopulatedGroup[] = workout.exerciseGroups
    .map(group => ({ ...group, exercise: exerciseServices.getExerciseById(group.exerciseId) }));
  const populatedWorkout: PopulatedWorkout = { ...workout, populatedGroups }

  return (
    <Card sx={{ width: '100%', bgcolor: bgBlue, borderRadius: 5 }}>
      <ProgramWorkoutCardTitle workout={populatedWorkout} />
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
            <ProgramWorkoutExercises workout={populatedWorkout} />
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}

type CardProps = {
  workout: PopulatedWorkout
}

function ProgramWorkoutCardTitle({ workout }: CardProps) {
  const { getProgramWorkoutOptions } = useProgramForm();
  const numberOfExercises = workout.exerciseGroups.length;
  const menuItems = getProgramWorkoutOptions(workout);
  const exercises = workout.populatedGroups.map(g => g.exercise);
  const maxMuscle = getMaxMuscleForExercises(exercises);

  return (
    <CardHeader
      sx={{ overflow: 'hidden' }}
      avatar={
        <Avatar aria-label="workout" sx={{ bgcolor: maxMuscle.colorRgb }}>
          {maxMuscle.name[0].toUpperCase()}
        </Avatar>
      }
      action={
        <Box>
          <VerticalIconMenu
            buttonId={workout.name.split(' ').join('-').toLowerCase() + "-group-options"}
            menuItems={menuItems}
          />
        </Box>
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
  workout: PopulatedWorkout,
}

function ProgramWorkoutExercises({ workout }: CardExercisesProp) {

  return (
    <List dense={true} sx={{ pt: 0 }}>
      <TransitionGroup>
        {workout.populatedGroups.map(group => (
          <Collapse key={group.id} >
            <ProgramExerciseGroupItem key={workout.id} group={group} />
          </Collapse>
        ))}
      </TransitionGroup>
    </List>
  );
}

type CardExerciseGroupProp = {
  group: PopulatedGroup
}

function ProgramExerciseGroupItem({ group }: CardExerciseGroupProp) {
  const { editing } = useProgramForm();
  const { exercise } = group;
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
          <Typography variant='h6' sx={{ fontSize: '1.125rem' }}>
            {editing
              ? exercise.name
              : <Link to={`/exercises/${exercise.id}`}>{exercise.name}</Link>
            }
          </Typography>
        }
        secondary={
          `${exercise.category} - ${numberOfSets} ${checkPluralization("Set", numberOfSets)}`
        }
        slotProps={{ secondary: { sx: { textTransform: 'capitalize' } } }}
      />
    </ListItem>
  )
}