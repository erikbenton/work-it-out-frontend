import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { type TransitionProps } from '@mui/material/transitions';
import { useExercises } from '../../../hooks/useExercises';
import { useState } from 'react';
import useWorkoutForm from '../../../hooks/useWorkoutForm';
import ExerciseSelectionItem from './ExerciseSelectionItem';

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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function WorkoutExerciseSelection({ open, setOpen }: Props) {
  const { exercises } = useExercises();
  const { dispatch } = useWorkoutForm();
  const [selected, setSelected] = useState<number[]>([]);

  const handleSave = () => {
    dispatch({
      type: 'addExercises',
      payload: { newExercises: selected }
    });
    handleClose();
  }

  const handleClose = () => {
    setSelected([]);
    setOpen(false);
  };

  return (
    <>
      <Dialog
        disableRestoreFocus
        fullScreen
        open={open}
        onClose={handleClose}
        sx={{ width: '100%' }}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Exercises
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {exercises.map(ex => (
            <ExerciseSelectionItem
              key={ex.id}
              selected={selected}
              setSelected={setSelected}
              exercise={ex}
            />
          ))}
        </List>
      </Dialog>
    </>
  );

}