import { Box, Chip, Paper, Stack, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from "react";
import type Exercise from "../../types/exercise";

const categories = ['lift', 'timed', 'conditioning'];

const muscleOptions = ['back', 'cardio', 'chest', 'forearms', 'lower legs',
  'neck', 'shoulders', 'biceps', 'triceps', 'upper legs', 'core'];

const equipmentOptions = ['assisted', 'band', 'barbell', 'body weight', 'cable',
  'dumbbell', 'machine', 'ez barbell', 'kettlebell', 'medicine ball',
  'resistance band', 'roller', 'rope', 'stability ball', 'trap bar', 'weighted'
];

export default function ExerciseCreate() {
  const [exercise, setExercise] = useState<Exercise>({
    id: 0,
    name: null,
    instructions: null,
    bodyPart: 'back',
    equipment: 'assisted',
    muscles: [],
    category: 'lift'
  });

  const handleMuscles = (_event: React.MouseEvent<HTMLElement>, newMuscles: string[]) => {
    setExercise(prev => ({ ...prev, muscles: newMuscles }))
  };

  const handleEquipment = (_event: React.MouseEvent<HTMLElement>, newEquipment: string) => {
    setExercise(prev => ({ ...prev, equipment: newEquipment }))
  };

  const handleCategory = (_event: React.ChangeEvent<HTMLInputElement, Element>, newCategory: string) => {
    const castedEquipment = newCategory as 'lift' | 'timed' | 'conditioning';
    setExercise(prev => ({ ...prev, category: castedEquipment }))
  }

  return (
    <Box className="w-full md:w-2/3 p-3">
      <form className="w-full">
        <Stack spacing={2}>
          <Paper
            sx={{ width: '100%', display: 'flex', flexDirection: 'row', py: 2 }}
            square={false}
          >
            <Stack spacing={2} sx={{ flexGrow: 1, mx: 2 }}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                sx={{ flexGrow: 1 }}
                value={exercise.name ?? ""}
                onChange={(e) => setExercise(prev => ({ ...prev, name: e.target.value === "" ? null : e.target.value }))}
              />
              <TextField
                id="instructions"
                label="Instructions"
                variant="outlined"
                multiline
                maxRows={6}
                sx={{ flexGrow: 1 }}
                value={exercise.instructions ?? ""}
                onChange={(e) => setExercise(prev => ({ ...prev, instructions: e.target.value === "" ? null : e.target.value }))}
              />
            </Stack>
          </Paper>
          <Paper
            sx={{ width: '100%', display: 'flex', flexDirection: 'row', py: 2 }}
            square={false}
          >
            <Stack spacing={2} sx={{ flexGrow: 1, mx: 2 }}>
              <FormControl>
                <FormLabel id="exercise-category-group-label">Category</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="exercise-category-group-label"
                  name="exercise-category-group"
                  value={exercise.category}
                  onChange={handleCategory}
                >
                  {categories.map(category => (
                    <FormControlLabel key={category} value={category} control={<Radio />} label={category} className="capitalize" />
                  ))}
                </RadioGroup>
              </FormControl>
            </Stack>
          </Paper>
          <Paper
            sx={{ width: '100%', py: 2 }}
            square={false}
          >
            <Stack sx={{ mx: 2 }}>
              <FormLabel id="exercise-muscle-group-label">Muscles</FormLabel>
              <ToggleButtonGroup
                value={exercise.muscles ?? []}
                onChange={handleMuscles}
                aria-label="Muscles"
                sx={{ flexWrap: 'wrap' }}
              >
                {muscleOptions.map(option => (
                  <ToggleButton key={option} className="rounded-full" value={option} sx={{ border: 'none', p: 0, mr: 1, mt: 1 }}>
                    <Chip label={option} variant="outlined" />
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Stack>
          </Paper>
          <Paper
            sx={{ width: '100%', py: 2 }}
            square={false}
          >
            <Stack sx={{ mx: 2 }}>
              <FormLabel id="exercise-equipment-group-label">Equipment</FormLabel>
              <ToggleButtonGroup
                value={exercise.equipment}
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
        </Stack>
      </form>
    </Box>
  );
}