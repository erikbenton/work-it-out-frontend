import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import type ExerciseGroup from '../../../types/exerciseGroup';
import { Stack } from '@mui/material';
import ExerciseGroupCardSets from './ExercsieGroupCardSets';
import ExerciseGroupCardTitle from './ExerciseGroupCardTitle';
import ExpandMoreButton from '../../layout/ExpandMoreButton';
import ExerciseGroupCardDetails from './ExerciseGroupDetails';

type Props = {
  exerciseGroup: ExerciseGroup,
  isEditing: boolean,
  expanded: boolean,
  handleExpandClick: () => void
}

export default function ExerciseGroupCard({ exerciseGroup, isEditing, expanded, handleExpandClick }: Props) {

  return (
    <Card sx={{ width: '100%' }}>
      <ExerciseGroupCardTitle
        exerciseName={exerciseGroup.exercise.name ?? ""}
        muscles={exerciseGroup.exercise.muscles ?? []}
        numberOfSets={exerciseGroup.exerciseSets.length}
        isEditing={isEditing}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className='pb-0'>
          <Stack spacing={1}>
            <ExerciseGroupCardDetails exerciseGroup={exerciseGroup} />
            <ExerciseGroupCardSets exerciseSets={exerciseGroup.exerciseSets} isEditing={isEditing} />
          </Stack>
        </CardContent>
      </Collapse>
      <CardActions disableSpacing>
        <ExpandMoreButton
          expanded={expanded}
          handleExpandClick={handleExpandClick}
          ariaLabel="show exercise group details"
          className='mx-auto p-0'
        />
      </CardActions>
    </Card>
  );
}
