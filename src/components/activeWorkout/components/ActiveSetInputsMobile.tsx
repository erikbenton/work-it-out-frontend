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
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

type Props = {
  exerciseGroup: ActiveExerciseGroup,
  set: ActiveExerciseSet
}

const drawerBleeding = 45;
const drawerHeight = '25%';

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: grey[100],
  ...theme.applyStyles('dark', {
    backgroundColor: (theme.vars || theme).palette.background.default,
  }),
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
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
  const { dispatch } = useActiveWorkout();
  const [values, setValues] = useState<ActiveExerciseSet>(set);
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setValues(prev => ({ ...prev, setTagId: set.setTagId }));
    toggleDrawer(false);
  }

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({
      type: 'updateSet',
      payload: {
        group: exerciseGroup,
        set: { ...values }
      }
    });

    toggleDrawer(false);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weight = Number(e.target.value);
    if (weight < 0) return;
    const newSet = { ...values, weight }
    setValues(newSet);
  }

  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reps = Number(e.target.value);
    if (reps < 0) return;
    const newSet = { ...values, reps }
    setValues(newSet);
  }

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Root>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(${drawerHeight} - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        keepMounted
      >
        <StyledBox
          sx={{
            bgcolor: 'fff',
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Box sx={{ py: '23px', bgcolor: 'fff', }}><Puller /></Box>
        </StyledBox>
        <Box component='form' sx={{ overflow: 'auto' }} onSubmit={handleSubmit} id="exercise-set-input-form">
          <Stack spacing={1}>
            <FormLabel id="repetition-label">Repetitions</FormLabel>
            <Stack direction='row' spacing={2}>
              <TextField
                autoFocus
                id="weight"
                name="weight"
                label="Weight (lbs)"
                type="number"
                fullWidth
                variant="standard"
                value={values.minReps ? values.minReps : ""}
                onChange={handleWeightChange}
              />
              <TextField
                id="maxReps"
                name="maxReps"
                label="Max"
                type="number"
                fullWidth
                variant="standard"
                value={values.maxReps ? values.maxReps : ""}
                onChange={handleRepsChange}
              />
            </Stack>
          </Stack>
        </Box>
      </SwipeableDrawer>
    </Root>
  );
}
