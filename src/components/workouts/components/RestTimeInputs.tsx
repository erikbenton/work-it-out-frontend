import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type ExerciseGroup from "../../../types/exerciseGroup";
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import useWorkoutForm from "../../../hooks/useWorkoutForm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import type { PickerValue } from "@mui/x-date-pickers/internals";
import { devConsole } from "../../../utils/debugLogger";

type Props = {
  exerciseGroup: ExerciseGroup
}

export default function ExerciseGroupRestDurationInput({ exerciseGroup }: Props) {
  const { editing } = useWorkoutForm();
  const [open, setOpen] = useState(false);

  const handleAccept = (value: PickerValue) => {
    devConsole(value)
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClockChange = (value: PickerValue) => {
    devConsole(value);
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} disableRestoreFocus>
        <DialogContent sx={{ p: 0 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticTimePicker
              onChange={handleClockChange}
              onAccept={handleAccept}
              ampm={false}
            />
          </LocalizationProvider>
        </DialogContent>
      </Dialog>
      <Button
        variant="text"
        color='inherit'
        disableTouchRipple={!editing}
        sx={{ textTransform: 'none' }}
        startIcon={<AlarmOutlinedIcon className='mr-2' />}
        onClick={() => { if (editing) { setOpen(true) } }}
      >
        <Typography
          sx={{ flex: 1, textAlign: 'left' }}
          className={exerciseGroup.restTime ? '' : 'text-gray-400'}
        >
          {exerciseGroup.restTime ? exerciseGroup.restTime.slice(exerciseGroup.restTime.search(/[1-9]/)) : ''}
        </Typography>
      </Button>
    </>
  );
}