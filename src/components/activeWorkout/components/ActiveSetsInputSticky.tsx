import * as React from 'react';
import Box from '@mui/material/Box';
import useActiveWorkout from '../../../hooks/useActiveWorkout';
import type ActiveExerciseSet from '../../../types/activeExerciseSet';
import type ActiveExerciseGroup from '../../../types/activeExerciseGroup';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useCompletedWorkouts } from '../../../hooks/useCompletedWorkouts';
import { devConsole } from '../../../utils/debugLogger';
import { useState } from 'react';
import SetTagsInput from './SetTagsInput';
import Button from '@mui/material/Button';
import LiftingInputs from './LiftingInputs';
import useSetTags from '../../../hooks/useSetTags';
import { bgBlue } from '../../../utils/styling';
import { Collapse } from '@mui/material';

type Props = {
  exerciseGroup: ActiveExerciseGroup,
  values?: ActiveExerciseSet,
  setValues: React.Dispatch<React.SetStateAction<ActiveExerciseSet | undefined>>,
  allSetsCompleted: boolean,
  completeSet: (completedSet: ActiveExerciseSet) => void,
  size: 'small' | 'large'
}

export default function ActiveSetsInputSticky({ exerciseGroup, values, setValues, allSetsCompleted, completeSet, size }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { dispatch, workout, complete: workoutCompleted } = useActiveWorkout();
  const { services } = useCompletedWorkouts();
  const navigate = useNavigate();
  const { setTags } = useSetTags();
  const setTag = setTags?.find(s => s.id === values?.setTagId);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!allSetsCompleted && values) {
      completeSet(values);
    }
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

  return (

    <Box
      position='sticky'
      bottom={0}
      component='form'
      sx={{
        overflow: 'auto',
        bgcolor: bgBlue,
        zIndex: 3,
        pt: 3,
        pb: 1,
        boxShadow: 1,
        mx: size === 'small' ? 0 : 1
      }}
      onSubmit={handleSubmit}
      id="exercise-set-input-form"
    >
      <Collapse in={true} appear={true}>
        {workoutCompleted
          ? <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button sx={{ width: '90%', borderRadius: 5 }} variant='contained' onClick={handleFinishWorkout}>
              Finish Workout
            </Button>
          </Box>
          : allSetsCompleted
            ? <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Button sx={{ width: '90%', borderRadius: 5 }} variant='contained' onClick={handleNextExercise}>
                Next Exercise
              </Button>
            </Box>
            : <Stack spacing={1} sx={{ bgcolor: bgBlue }}>
              <LiftingInputs values={values} setValues={setValues} size={size} />
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
              <SetTagsInput expanded={expanded} setValues={setValues} values={values} />
            </Stack>
        }
      </Collapse>
    </Box>
  )
}