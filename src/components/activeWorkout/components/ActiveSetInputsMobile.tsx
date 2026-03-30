import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useActiveWorkout from '../../../hooks/useActiveWorkout';
import type ActiveExerciseSet from '../../../types/activeExerciseSet';
import type ActiveExerciseGroup from '../../../types/activeExerciseGroup';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useCompletedWorkouts } from '../../../hooks/useCompletedWorkouts';
import { devConsole } from '../../../utils/debugLogger';
import { useState } from 'react';
import SetTagsInputMobile from './SetTagsInputMobile';
import Button from '@mui/material/Button';
import LiftingInputsMobile from './LiftingInputsMobile';
import useSetTags from '../../../hooks/useSetTags';
import { bgBlue } from '../../../utils/styling';

type Props = {
  exerciseGroup: ActiveExerciseGroup,
  values?: ActiveExerciseSet,
  setValues: React.Dispatch<React.SetStateAction<ActiveExerciseSet | undefined>>,
  allSetsCompleted: boolean,
  completeSet: (completedSet: ActiveExerciseSet) => void
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
  backgroundColor: bgBlue,
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

export default function ActiveSetInputsMobile({ exerciseGroup, values, setValues, allSetsCompleted, completeSet }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { dispatch, workout, editing, setEditing, complete: workoutCompleted } = useActiveWorkout();
  const { services } = useCompletedWorkouts();
  const navigate = useNavigate();
  const { setTags } = useSetTags();
  const setTag = setTags?.find(s => s.id === values?.setTagId);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!allSetsCompleted && values) {
      completeSet(values);
    }

    toggleDrawer(false);
  };

  const handleNextExercise = () => {
    const nextGroup = workout?.exerciseGroups.find(g => (
      g.exerciseSets.some(s => !s.completed) || (g.exerciseSets.length === 0 && g.key !== exerciseGroup.key)));
    if (nextGroup) {
      const nextSet = nextGroup.exerciseSets[0];
      setValues(nextSet);
      navigate(`/activeWorkout/${nextGroup.key}`);
    }
  }

  const toggleDrawer = (newEditing: boolean) => () => {
    setEditing(newEditing);
  };

  const handleFinishWorkout = () => {
    if (workout) {
      services.createFromActiveWorkout(workout, {
        onSuccess: async (savedCompletedWorkout) => {
          devConsole(savedCompletedWorkout);
          navigate(`/completedWorkouts/${savedCompletedWorkout.id}`)
          dispatch({ type: 'endWorkout' });
        }
      });
    }
  }

  const expandedOffset = expanded ? '5%' : '0px';

  return (
    <Root className='mobile-inputs'>
      <Global
        styles={{
          '.mobile-inputs.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(${drawerHeight} + ${expandedOffset} - ${drawerBleeding}px)`,
            overflow: 'visible',
            backgroundColor: bgBlue
          },
        }}
      />
      <SwipeableDrawer
        className='mobile-inputs'
        anchor="bottom"
        open={editing}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        sx={{ position: 'initial' }} //keeps drawer open after outside clicks
        keepMounted
        slotProps={{ backdrop: { invisible: true } }}
        ModalProps={{ disableScrollLock: true }}
      >
        <StyledBox
          sx={{
            bgcolor: bgBlue,
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Box className="rounded-xl" sx={{ py: '23px', bgcolor: bgBlue }}><Puller /></Box>
        </StyledBox>
        <Box component='form' sx={{ overflow: 'auto', bgcolor: bgBlue }} onSubmit={handleSubmit} id="exercise-set-input-form">
          {workoutCompleted
            ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button sx={{ width: '90%', borderRadius: 5 }} variant='contained' onClick={handleFinishWorkout}>
                Finish Workout
              </Button>
            </Box>
            : allSetsCompleted
              ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button sx={{ width: '90%', borderRadius: 5 }} variant='contained' onClick={handleNextExercise}>
                  Next Exercise
                </Button>
              </Box>
              : <Stack spacing={2} sx={{ bgcolor: bgBlue }}>
                <LiftingInputsMobile values={values} setValues={setValues} />
                <Stack direction='row' sx={{ justifyContent: 'space-evenly' }}>
                  <Button
                    sx={{ width: '45%', borderRadius: 5 }}
                    variant='outlined'
                    onClick={() => setExpanded(!expanded)}
                  >
                    {setTag ? setTag.name : 'Tag'}
                  </Button>
                  <Button type='submit' sx={{ width: '45%', borderRadius: 5 }} variant='contained'>Complete</Button>
                </Stack>
                <SetTagsInputMobile expanded={expanded} setValues={setValues} values={values} />
              </Stack>
          }
        </Box>
      </SwipeableDrawer>
    </Root>
  );
}
