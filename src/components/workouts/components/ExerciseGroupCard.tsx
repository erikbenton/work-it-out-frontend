import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import type ExerciseGroup from '../../../types/exerciseGroup';
import { Button, Stack } from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import ExerciseGroupCardSets from './ExercsieGroupCardSets';
import ExerciseGroupCardTitle from './ExerciseGroupCardTitle';
import ExpandMoreButton from '../../layout/ExpandMoreButton';

type Props = {
  exerciseGroup: ExerciseGroup
}

export default function ExerciseGroupCard({ exerciseGroup }: Props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: '100%' }}>
      <ExerciseGroupCardTitle
        exerciseName={exerciseGroup.exercise.name ?? ""}
        numberOfSets={exerciseGroup.exerciseSets.length}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className='pb-0'>
          <Stack spacing={1}>
            <Button
              variant="text"
              color='inherit'
              sx={{ textTransform: 'none' }}
              startIcon={<NotesIcon className='mr-2' />}
            >
              <Typography
                sx={{ flex: 1, textAlign: 'left' }}
                className={exerciseGroup.note ? '' : 'text-gray-400'}
              >
                {exerciseGroup.note ?? 'Note'}
              </Typography>
            </Button>
            <Button
              variant="text"
              color='inherit'
              sx={{ textTransform: 'none' }}
              startIcon={<AlarmOutlinedIcon className='mr-2' />}
            >
              <Typography
                sx={{ flex: 1, textAlign: 'left' }}
                className={exerciseGroup.note ? '' : 'text-gray-400'}
              >
                {exerciseGroup.restTime ? exerciseGroup.restTime.slice(exerciseGroup.restTime.search(/[1-9]/)) : ''}
              </Typography>
            </Button>
            <ExerciseGroupCardSets exerciseSets={exerciseGroup.exerciseSets} />
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
