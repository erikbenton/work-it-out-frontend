import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import type { ExerciseAction } from "../../../reducers/exerciseReducer";
import ToggleButton from "@mui/material/ToggleButton";
import Chip from "@mui/material/Chip";
import { grey } from '@mui/material/colors';
import type MuscleData from "../../../types/muscleData";
import useMuscleOptions from "../../../hooks/useMuscleOptions";

type Props = {
  muscles?: MuscleData[],
  dispatch: React.ActionDispatch<[action: ExerciseAction]>
}

export default function ExerciseFormMuscles({ muscles, dispatch }: Props) {
  const { muscleOptions } = useMuscleOptions();

  const handleMuscles = (_event: React.MouseEvent<HTMLElement>, newMuscles: string[]) => {
    const muscleData: MuscleData[] = newMuscles.map(m => ({ name: m, weight: 1 }));
    dispatch({ type: 'setMuscles', payload: { muscles: muscleData } });
  };

  return (
    <Paper
      sx={{ width: '100%', py: 2, bgcolor: grey[50] }}
      square={false}
    >
      <Stack sx={{ mx: 2 }}>
        <FormLabel id="exercise-muscle-group-label">Muscles</FormLabel>
        <ToggleButtonGroup
          value={muscles?.map(m => m.name) ?? []}
          onChange={handleMuscles}
          aria-label="Muscles"
          sx={{ flexWrap: 'wrap' }}
        >
          {muscleOptions.map(option => (
            <ToggleButton key={option.name} className="rounded-full" value={option.name} sx={{ border: 'none', p: 0, mr: 1, mt: 1 }}>
              <Chip label={option.name} variant="outlined" />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
    </Paper>
  );
}