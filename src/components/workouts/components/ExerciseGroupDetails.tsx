import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NotesIcon from '@mui/icons-material/Notes';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import type ExerciseGroup from "../../../types/exerciseGroup";
import { useState } from "react";
import type { WorkoutAction } from "../../../reducers/workoutReducer";
import ExerciseGroupNoteInput from "./ExerciseGroupNoteInput";

type Props = {
  exerciseGroup: ExerciseGroup,
  dispatch: React.ActionDispatch<[action: WorkoutAction]>
}


export default function ExerciseGroupCardDetails({ exerciseGroup, dispatch }: Props) {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <ExerciseGroupNoteInput open={editing} setOpen={setEditing} exerciseGroup={exerciseGroup} dispatch={dispatch} />
      <Button
        variant="text"
        color='inherit'
        sx={{ textTransform: 'none' }}
        startIcon={<NotesIcon className='mr-2' />}
        onClick={() => setEditing(true)}
      >
        <Typography
          sx={{ flex: 1, textAlign: 'left' }}
          className={exerciseGroup.note ? '' : 'text-gray-400'}
        >
          {exerciseGroup.note ?? 'Note'}
        </Typography>
      </Button>
      <Button
        variant="text"
        color='inherit'
        sx={{ textTransform: 'none' }}
        startIcon={<AlarmOutlinedIcon className='mr-2' />}
      >
        <Typography
          sx={{ flex: 1, textAlign: 'left' }}
          className={exerciseGroup.note ? '' : 'text-gray-400'}
        >
          {exerciseGroup.restTime ? exerciseGroup.restTime.slice(exerciseGroup.restTime.search(/[1-9]/)) : ''}
        </Typography>
      </Button>
    </>
  );
}