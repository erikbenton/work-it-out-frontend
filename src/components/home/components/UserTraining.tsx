import Box from "@mui/material/Box";
import ActiveWorkoutsList from "../../activeWorkout/components/ActiveWorkoutsList";
import { usePrograms } from "../../../hooks/usePrograms";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useActiveWorkout from "../../../hooks/useActiveWorkout";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import { bgBlue } from "../../../utils/styling";
import type WorkoutProgram from "../../../types/workoutProgram";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import CardActions from "@mui/material/CardActions";
import ExpandMoreButton from "../../layout/ExpandMoreButton";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import { useWorkouts } from "../../../hooks/useWorkouts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { checkPluralization } from "../../../utils/formatters";
import { useExercises } from "../../../hooks/useExercises";
import type Workout from "../../../types/workout";
import { getMaxMuscleGroup } from "../../../utils/muscles";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";


export default function UserTraining() {

  return (
    <Box sx={{ width: '100%' }}>
      <ActiveWorkoutsList titleVariant="h6" titleComponent="h3" titlePaddingX={1} />
    </Box>
  )
}

export function UserPrograms() {
  const { programs } = usePrograms();
  const { dispatch } = useActiveWorkout();
  const navigate = useNavigate();

  const handleEmptyWorkout = () => {
    dispatch({ type: 'startEmptyWorkout', payload: null });
    navigate('/training');
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography
          variant='h6'
          component='h3'
          sx={{ px: 1 }}
        >
          Training
        </Typography>
        <Button
          fullWidth
          type='button'
          variant='outlined'
          sx={{ borderRadius: 5, textTransform: 'none' }}
          onClick={handleEmptyWorkout}
        >
          Start Empty Workout
        </Button>
      </Stack>
      <Stack spacing={1}>
        {programs.map((program) => (
          <ProgramWorkoutsCard key={program.id} program={program} />
        ))}
      </Stack>
      <Box sx={{ height: '10vh' }}></Box>
    </Box>
  )
}

type CardProps = {
  program: WorkoutProgram
}

function ProgramWorkoutsCard({ program }: CardProps) {
  const { services: workoutServices } = useWorkouts();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const workouts = program.workoutIds.map(p => workoutServices.getWorkoutById(p));

  const menuItems = [
    {
      label: "View",
      handleClick: () => {
        navigate(`/programs/${program.id}`);
      },
    },
  ];

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <Card sx={{ bgcolor: bgBlue, borderRadius: 5 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="workout" sx={{ bgcolor: program.colorRgb }}>
            {program.name[0].toUpperCase()}
          </Avatar>
        }
        title={program.name}
        action={
          <VerticalIconMenu
            buttonId={program.name.split(' ').join('-').toLowerCase() + "-options"}
            menuItems={menuItems}
          />
        }
        slotProps={{ title: { variant: 'h6' } }}
        sx={{ pb: 0 }}
      />
      <CardActions disableSpacing>
        <ExpandMoreButton
          expand={isExpanded}
          handleExpandClick={handleExpandClick}
          ariaLabel="show program workouts"
          className='mx-auto '
        />
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List dense={true} sx={{ pt: 0 }}>
            {workouts.map(workout => (
              <ProgramWorkoutItem key={workout.id} workout={workout} />
            ))}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  )
}

type ItemProps = {
  workout: Workout
}

function ProgramWorkoutItem({ workout }: ItemProps) {
  const { services: exercises } = useExercises();
  const { dispatch } = useActiveWorkout();
  const navigate = useNavigate();
  const maxMuscle = getMaxMuscleGroup(workout.exerciseGroups, exercises);

  const handleStartWorkout = () => {
    dispatch({ type: 'initializeWorkout', payload: { initialWorkout: workout } });
    navigate('/training');
  }

  return (
    <ListItem
      disableGutters
      key={workout.id}
      secondaryAction={
        <IconButton
          aria-label="start workout"
          onClick={handleStartWorkout}
          sx={{ color: blue[300] }}
        >
          <PlayCircleIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar aria-label={`${workout.name}`} sx={{ bgcolor: maxMuscle.colorRgb }}>
          {maxMuscle.name[0].toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant='h6' sx={{ fontSize: '1.125rem' }}>
            {workout.name}
          </Typography>
        }
        secondary={
          `${workout.exerciseGroups.length} ${checkPluralization("Exercise", workout.exerciseGroups.length)}`
        }
        slotProps={{ secondary: { sx: { textTransform: 'capitalize' } } }}
      />
    </ListItem>
  )
}