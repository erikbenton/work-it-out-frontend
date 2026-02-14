import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import type { ExerciseAction } from "../../../reducers/exerciseReducer";

const categories = ['lift', 'timed', 'conditioning'];

type Props = {
  category: string | undefined,
  dispatch: React.ActionDispatch<[action: ExerciseAction]>
}

export default function ExerciseFormCategory({ category, dispatch }: Props) {

  const handleCategory = (_event: React.ChangeEvent<HTMLInputElement, Element>, newCategory: string) => {
    dispatch({ type: 'setCategory', payload: { category: newCategory } });
  }

  return (
    <Paper
      sx={{ width: '100%', display: 'flex', flexDirection: 'row', py: 2, bgcolor: '#F5FBFF' }}
      square={false}
    >
      <Stack spacing={2} sx={{ flexGrow: 1, mx: 2 }}>
        <FormControl>
          <FormLabel id="exercise-category-group-label">Category</FormLabel>
          <RadioGroup
            row
            aria-labelledby="exercise-category-group-label"
            name="exercise-category-group"
            value={category}
            onChange={handleCategory}
          >
            {categories.map(category => (
              <FormControlLabel key={category} value={category} control={<Radio />} label={category} className="capitalize" />
            ))}
          </RadioGroup>
        </FormControl>
      </Stack>
    </Paper>
  );
}