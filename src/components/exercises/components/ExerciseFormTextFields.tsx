import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import type { ExerciseAction } from "../../../reducers/exerciseReducer";

type Props = {
  name: string | null,
  instructions: string | null,
  dispatch: React.ActionDispatch<[action: ExerciseAction]>
}

export default function ExerciseFormTextFields({ name, instructions, dispatch }: Props) {

  const handleName = (event: React.ChangeEvent<HTMLInputElement, Element>) => {
    dispatch({ type: 'setName', payload: { name: event.target.value } });
  }

  const handleInstructions = (event: React.ChangeEvent<HTMLInputElement, Element>) => {
    dispatch({ type: 'setInstructions', payload: { instructions: event.target.value } });
  }

  return (
    <Paper
      sx={{ width: '100%', display: 'flex', flexDirection: 'row', py: 2, bgcolor: '#F5FBFF' }}
      square={false}
    >
      <Stack spacing={2} sx={{ flexGrow: 1, mx: 2 }}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          sx={{ flexGrow: 1 }}
          value={name ?? ""}
          onChange={handleName}
        />
        <TextField
          id="instructions"
          label="Instructions"
          variant="outlined"
          multiline
          maxRows={6}
          sx={{ flexGrow: 1 }}
          value={instructions ?? ""}
          onChange={handleInstructions}
        />
      </Stack>
    </Paper>
  );
}