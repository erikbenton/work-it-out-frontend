import Chip from "@mui/material/Chip";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import type { ExerciseAction } from "../../../reducers/exerciseReducer";
import { grey } from '@mui/material/colors';

const equipmentOptions = ['assisted', 'band', 'barbell', 'body weight', 'cable',
  'dumbbell', 'machine', 'ez barbell', 'kettlebell', 'medicine ball',
  'resistance band', 'roller', 'rope', 'stability ball', 'trap bar', 'weighted'
];

type Props = {
  equipment: string | null,
  dispatch: React.ActionDispatch<[action: ExerciseAction]>
}

export default function ExerciseFormEquipment({ equipment, dispatch }: Props) {

  const handleEquipment = (_event: React.MouseEvent<HTMLElement>, newEquipment: string) => {
    dispatch({ type: 'setEquipment', payload: { equipment: newEquipment } });
  };

  return (
    <Paper
      sx={{ width: '100%', py: 2, bgcolor: grey[50] }}
      square={false}
    >
      <Stack sx={{ mx: 2 }}>
        <FormLabel id="exercise-equipment-group-label">Equipment</FormLabel>
        <ToggleButtonGroup
          value={equipment}
          exclusive
          onChange={handleEquipment}
          aria-label="Equipment"
          sx={{ flexWrap: 'wrap' }}
        >
          {equipmentOptions.map(option => (
            <ToggleButton key={option} className="rounded-full" value={option} sx={{ border: 'none', p: 0, mr: 1, mt: 1 }}>
              <Chip label={option} variant="outlined" />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
    </Paper>
  );
}