import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { checkPluralization } from "../../../utils/formatters";
import useProgramForm from "../../../hooks/useProgramForm";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import ProgramFormColorInput from "./ProgramFormColorInput";

export default function ProgramFormDescriptionInput() {
  const { editing, program, handleStartSelectingWorkouts } = useProgramForm();

  return (
    <>
      <ProgramFormColorInput />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          px: 1
        }}
      >
        <Typography variant="body1" component="span">
          {program.workoutIds.length} {checkPluralization("Workout", program.workoutIds.length)}
        </Typography>
        <Grow in={editing} >
          <IconButton color="primary" onClick={handleStartSelectingWorkouts}>
            <AddCircleOutlinedIcon fontSize="large" />
          </IconButton>
        </Grow>
      </Stack>
    </>
  );
}