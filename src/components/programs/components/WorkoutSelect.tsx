import { useMediaQuery, List, ListSubheader, ListItem, useTheme, Dialog, Slide, DialogContent, AppBar, Toolbar, IconButton, Typography, Button, ListItemButton, ListItemText } from "@mui/material";
import React, { Suspense, useMemo, useState } from "react";
import { type TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import useProgramForm from "../../../hooks/useProgramForm";
import type Workout from "../../../types/workout";
import { useExercises } from "../../../hooks/useExercises";
import { capitalize } from "../../../utils/formatters";
import CheckIcon from '@mui/icons-material/Check';
import { useWorkouts } from "../../../hooks/useWorkouts";
import { devConsole } from "../../../utils/debugLogger";
import LoadingIcon from "../../layout/LoadingIcon";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  open: boolean,
  limit?: number
}

export default function WorkoutSelect({ open, limit }: Props) {
  const { program, addWorkouts, handleStopSelectingWorkouts } = useProgramForm();
  const { workouts } = useWorkouts();
  const [selected, setSelected] = useState<number[]>([]);
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { height } = useWindowDimensions();

  const handleSave = () => {
    addWorkouts(selected);
    handleCloseDialog();
  }

  const handleCloseDialog = () => {
    setSelected([]);
    handleStopSelectingWorkouts();
  };

  const filteredWorkouts = useMemo(() => {
    devConsole('filtered workouts memo');
    return workouts
      .filter(w => program.workoutIds.findIndex(id => id === w.id) === -1)
      .sort((a, b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1);
  }, [workouts, program.workoutIds]);

  const [filteredMap, letterKeys] = useMemo(() => {
    devConsole('filtered workout mapping memo')
    const workoutLetterMap = new Map<string, Workout[]>();
    const keys: string[] = [];
    filteredWorkouts.map(workout => {
      const letter = workout.name[0].toUpperCase();
      const entry = workoutLetterMap.get(letter);
      if (entry) {
        workoutLetterMap.set(letter, entry.concat(workout));
      } else {
        workoutLetterMap.set(letter, [workout]);
        keys.push(letter);
      }
    });
    return [workoutLetterMap, keys]
  }, [filteredWorkouts]);

  const sortedKeys = letterKeys.sort();

  const headerOffsetPixels = mobileScreen ? 56 : 64;

  return (

    <Dialog
      disableRestoreFocus
      fullScreen={mobileScreen}
      fullWidth
      maxWidth='sm'
      open={open}
      onClose={handleCloseDialog}
      slots={{
        transition: Transition,
      }}
      slotProps={{
        paper: {
          style: {
            minHeight: '100%',
            maxHeight: '100%',
          }
        }
      }}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Workouts
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ p: 0 }}>
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
          <Suspense fallback={<LoadingIcon label='Exercises' />}>
            {sortedKeys.map((key) => (
              <li key={`workouts-${key}`}>
                <ul>
                  <ListSubheader>{key}</ListSubheader>
                  {(filteredMap.get(key) ?? []).map((workout) => (
                    <WorkoutSelectionItem
                      key={workout.id}
                      selected={selected}
                      setSelected={setSelected}
                      workout={workout}
                      limit={limit}
                    />
                  ))}

                </ul>
              </li>
            ))}
          </Suspense>
          <ListItem sx={{ my: 2 }}></ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}

type ItemProps = {
  workout: Workout,
  selected: number[],
  setSelected: React.Dispatch<React.SetStateAction<number[]>>,
  limit?: number
}

function WorkoutSelectionItem({ workout, selected, setSelected, limit }: ItemProps) {
  const { services: exerciseServices } = useExercises();
  const alreadySelected = selected.findIndex(s => s === workout.id) > -1;
  const exercises = useMemo(() => {
    return workout.exerciseGroups.map(g => exerciseServices.getExerciseById(g.exerciseId));
  }, [workout, exerciseServices])

  const handleClick = () => {
    if (alreadySelected) {
      setSelected(prev => prev.filter(id => id !== workout.id));
    } else {
      const newSelection = limit && selected.length >= limit
        ? selected.concat(workout.id).slice(selected.length - limit + 1)
        : selected.concat(workout.id);
      setSelected(newSelection);
    }
  }

  return (
    <ListItem
      key={workout.id}
      disableGutters
      disablePadding
      secondaryAction={
        alreadySelected
          ? <IconButton
            edge="end"
            aria-label="added-workout"
            sx={{ mr: 1, color: 'primary.main' }}
          >
            <CheckIcon />
          </IconButton>
          : <></>
      }>
      <ListItemButton
        key={workout.id}
        onClick={handleClick}
      >
        <ListItemText
          primary={workout.name}
          secondary={exercises.map(ex => capitalize(ex.name ?? '')).join(', ')}
        />
      </ListItemButton>
    </ListItem>
  )
}