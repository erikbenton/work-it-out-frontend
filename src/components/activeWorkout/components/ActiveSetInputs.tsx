import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import type ActiveExerciseGroup from '../../../types/activeExerciseGroup';
import type ActiveExerciseSet from '../../../types/activeExerciseSet';
import useActiveWorkout from '../../../hooks/useActiveWorkout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompletedWorkouts } from '../../../hooks/useCompletedWorkouts';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { devConsole } from '../../../utils/debugLogger';

type Props = {
  exerciseGroup: ActiveExerciseGroup,
  set?: ActiveExerciseSet
}

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export default function ActiveSetInputs({ exerciseGroup, set }: Props) {
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

    toggleDialog(false);
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

  const toggleDialog = (newEditing: boolean) => () => {
    setEditing(newEditing);
  };

  const handleFinishWorkout = () => {
    if (workout) {
      services.createFromActiveWorkout(workout, {
        onSuccess: (savedCompletedWorkout) => {
          devConsole(savedCompletedWorkout);
          navigate(`/`);
        }
      });
    }
  }

  return (
    <Dialog fullWidth maxWidth='xs' onClose={toggleDialog(false)} open={editing}>
      <Box sx={{ overflow: 'auto', bgcolor: '#F5FBFF', p: 2 }} id="exercise-set-input-form">
        {workoutCompleted
          ? <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', minHeight: 64 }}>
            <Button sx={{ width: '90%' }} variant='contained' onClick={handleFinishWorkout}>
              Finish Workout
            </Button>
          </Box>
          : allSetsCompleted
            ? <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', minHeight: 64 }}>
              <Button sx={{ width: '70%' }} variant='contained' onClick={handleNextExercise}>
                Next Exercise
              </Button>
            </Box>
            : <Stack spacing={2} sx={{ bgcolor: '#F5FBFF' }}>
              <Stack component='form' onSubmit={handleSubmit} spacing={1}>
                <Stack direction='row' spacing={1} sx={{ width: '100%' }}>
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
                <Stack direction='row' spacing={1} sx={{ width: '100%' }}>
                  <Button fullWidth variant='outlined'>Comment</Button>
                  <Button type='submit' fullWidth variant='contained'>Complete</Button>
                </Stack>
              </Stack>
            </Stack>
        }
      </Box>
    </Dialog>
  );
}