import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import type ExerciseGroup from '../../../types/exerciseGroup';
import ExerciseGroupCardSets from './ExerciseGroupCardSets';
import ExerciseGroupCardTitle from './ExerciseGroupCardTitle';
import ExpandMoreButton from '../../layout/ExpandMoreButton';
import ExerciseGroupCardDetails from './ExerciseGroupDetails';
import { useExercises } from '../../../hooks/useExercises';
import useWorkoutForm from '../../../hooks/useWorkoutForm';

type Props = {
  exerciseGroup: ExerciseGroup,
  index: number
}

export default function ExerciseGroupCard({ exerciseGroup, index }: Props) {
  const { services } = useExercises();
  const { expanded } = useWorkoutForm();
  const exercise = services.getExerciseById(exerciseGroup.exerciseId);

  return (
    <Card sx={{ width: '100%' }}>
      <ExerciseGroupCardTitle
        exerciseName={exercise.name ?? ""}
        muscles={exercise.muscles ?? []}
        exerciseGroup={exerciseGroup}
      />
      <CardActions disableSpacing>
        <ExpandMoreButton
          index={index}
          ariaLabel="show exercise group details"
          className='mx-auto p-0'
        />
      </CardActions>
      <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
        <CardContent className='pt-0'>
          <Stack spacing={1}>
            <ExerciseGroupCardDetails exerciseGroup={exerciseGroup} />
            <ExerciseGroupCardSets exerciseGroup={exerciseGroup} />
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}
