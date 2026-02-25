import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useActiveWorkout from '../../../hooks/useActiveWorkout';
import { useState } from 'react';
import type ActiveExerciseSet from '../../../types/activeExerciseSet';
import type ActiveExerciseGroup from '../../../types/activeExerciseGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCompletedWorkouts } from '../../../hooks/useCompletedWorkouts';

type Props = {
  exerciseGroup: ActiveExerciseGroup,
  set?: ActiveExerciseSet
}

const drawerBleeding = 45;
const drawerHeight = '20%';

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: grey[100],
  ...theme.applyStyles('dark', {
    backgroundColor: (theme.vars || theme).palette.background.default,
  }),
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: '#F5FBFF',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[800],
  }),
}));

const Puller = styled('div')(({ theme }) => ({
  width: 50,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 15,
  bottom: 15,
  left: 'calc(50% - 25px)',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[900],
  }),
}));

export default function ActiveSetInputsMobile({ exerciseGroup, set }: Props) {
  const { dispatch, workout, editing, setEditing, complete: workoutCompleted } = useActiveWorkout();
  const { services } = useCompletedWorkouts();
  const [values, setValues] = useState<ActiveExerciseSet | undefined>(set);
  const navigate = useNavigate();
  const allSetsCompleted = (!set || !values);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!allSetsCompleted) {
      dispatch({
        type: 'updateSet',
        payload: {
          group: exerciseGroup,
          set: { ...values, completed: true }
        }
      });
    }

    toggleDrawer(false);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weight = Number(e.target.value);
    if (!values || weight < 0) return;
    const newSet: ActiveExerciseSet = { ...values, weight }
    setValues(newSet);
  }

  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reps = Number(e.target.value);
    if (!values || reps < 0) return;
    const newSet = { ...values, reps }
    setValues(newSet);
  }

  const handleNextExercise = () => {
    const nextGroup = workout?.exerciseGroups.find(g => (
      g.exerciseSets.some(s => !s.completed) || (g.exerciseSets.length === 0 && g.key !== exerciseGroup.key)));
    if (nextGroup) {
      navigate(`/activeWorkout/${nextGroup.key}`);
    }
  }

  const toggleDrawer = (newEditing: boolean) => () => {
    setEditing(newEditing);
  };

  const handleFinishWorkout = () => {
    if (workout) {
      services.createFromActiveWorkout(workout, {
        onSuccess: (savedCompletedWorkout) => {
          console.log(savedCompletedWorkout);
          navigate(`/`);
        }
      });
    }
  }

  return (
    <Root>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(${drawerHeight} - ${drawerBleeding}px)`,
            overflow: 'visible',
            backgroundColor: '#F5FBFF'
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={editing}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        sx={{ position: 'initial' }} //keeps drawer open after outside clicks
        keepMounted
        slotProps={{ backdrop: { invisible: true } }}
      >
        <StyledBox
          sx={{
            bgcolor: '#F5FBFF',
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Box className="rounded-xl" sx={{ py: '23px', bgcolor: '#F5FBFF' }}><Puller /></Box>
        </StyledBox>
        <Box component='form' sx={{ overflow: 'auto', bgcolor: '#F5FBFF' }} onSubmit={handleSubmit} id="exercise-set-input-form">
          {workoutCompleted
            ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button sx={{ width: '90%' }} variant='contained' onClick={handleFinishWorkout}>
                Finish Workout
              </Button>
            </Box>
            : allSetsCompleted
              ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button sx={{ width: '90%' }} variant='contained' onClick={handleNextExercise}>
                  Next Exercise
                </Button>
              </Box>
              : <Stack spacing={2} sx={{ bgcolor: '#F5FBFF' }}>
                <Stack direction='row' spacing={2} sx={{ px: 2 }}>
                  <TextField
                    autoFocus
                    id="weight"
                    name="weight"
                    label="Weight (lbs)"
                    type="number"
                    fullWidth
                    variant="filled"
                    value={values.weight ? values.weight : ""}
                    onChange={handleWeightChange}
                  />
                  <TextField
                    id="reps"
                    name="reps"
                    label="Repetitions"
                    type="number"
                    fullWidth
                    variant="filled"
                    value={values.reps ? values.reps : ""}
                    onChange={handleRepsChange}
                  />
                </Stack>
                <Stack direction='row' sx={{ justifyContent: 'space-evenly' }}>
                  <Button sx={{ width: '45%' }} variant='outlined'>Comment</Button>
                  <Button type='submit' sx={{ width: '45%' }} variant='contained'>Complete</Button>
                </Stack>
              </Stack>
          }
        </Box>
      </SwipeableDrawer>
    </Root>
  );
}
