import { Box, Typography } from "@mui/material";
import type Exercise from "../../../types/exercise";

type Props = {
  exercise: Exercise | undefined
}

export default function ExerciseAboutTab({ exercise }: Props) {
  return (
    <Box className="pt-2 px-3">
      <Typography variant="body1" className='capitalize mb-2'>Muscles: {exercise?.muscles?.map(m => m.name).join(', ')}</Typography>
      <Typography variant="body1" className='capitalize mb-2'>Equipment: {exercise?.equipment}</Typography>
      <Typography variant="body1">Instructions: {exercise?.instructions ?? "No instructions"}</Typography>
    </Box>
  );
}