import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import type { ExerciseAction } from "../../../reducers/exerciseReducer";
import { bgBlue } from "../../../utils/styling";
import useExerciseCategories from "../../../hooks/useExerciseCategories";

type Props = {
  categoryId: number,
  dispatch: React.ActionDispatch<[action: ExerciseAction]>
}

export default function ExerciseFormCategory({ categoryId, dispatch }: Props) {
  const { categories, services } = useExerciseCategories();
  const category = services.getCategoryById(categoryId) ?? categories[0];

  const handleCategory = (_event: React.ChangeEvent<HTMLInputElement, Element>, category: string) => {
    const categoryId = Number(category);
    dispatch({ type: 'setCategory', payload: { categoryId } });
  }

  return (
    <Paper
      sx={{ width: '100%', display: 'flex', flexDirection: 'row', py: 2, bgcolor: bgBlue,borderRadius: 5 }}
      square={false}
    >
      <Stack spacing={2} sx={{ flexGrow: 1, mx: 2 }}>
        <FormControl>
          <FormLabel id="exercise-category-group-label">Category</FormLabel>
          <RadioGroup
            row
            aria-labelledby="exercise-category-group-label"
            name="exercise-category-group"
            value={category.id ?? categories[0].id}
            onChange={handleCategory}
          >
            {categories.map(category => (
              <FormControlLabel key={category.id} value={category.id} control={<Radio />} label={category.name} className="capitalize" />
            ))}
          </RadioGroup>
        </FormControl>
      </Stack>
    </Paper>
  );
}