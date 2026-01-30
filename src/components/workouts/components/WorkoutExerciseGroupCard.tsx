import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotesIcon from '@mui/icons-material/Notes';
import { useState } from 'react';
import type ExerciseGroup from '../../../types/exerciseGroup';
import { Button, List, ListItem, ListItemAvatar, ListItemText, Stack } from '@mui/material';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import type ExerciseSet from '../../../types/exerciseSet';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

function formattedRepsText(set: ExerciseSet): string {
  return (`${set.minReps ?? ""}` +
    `${set.minReps && set.maxReps ? " - " : ""}` +
    `${set.maxReps ?? ""} Reps`);
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

type Props = {
  exerciseGroup: ExerciseGroup
}

export default function WorkoutExerciseGroupCard({ exerciseGroup }: Props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="exercise group">
            {exerciseGroup.exercise.name ? exerciseGroup.exercise.name[0] : ""}
          </Avatar>
        }
        action={
          <IconButton aria-label="exercise group settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={exerciseGroup.exercise.name ?? ""}
        subheader={`${exerciseGroup.exerciseSets.length} Sets`}
        slotProps={{ title: { variant: 'h6' } }}
        className='pb-0'
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className='pb-0'>
          <Stack spacing={1}>
            <Button variant="text" color='inherit' sx={{ textTransform: 'none' }} startIcon={<NotesIcon className='mr-2' />}>
              <Typography sx={{ flex: 1, textAlign: 'left' }} className={exerciseGroup.note ? '' : 'text-gray-400'}>
                {exerciseGroup.note ?? 'Note'}
              </Typography>
            </Button>
            <Button variant="text" color='inherit' sx={{ textTransform: 'none' }} startIcon={<AlarmOutlinedIcon className='mr-2' />}>
              <Typography sx={{ flex: 1, textAlign: 'left' }} className={exerciseGroup.note ? '' : 'text-gray-400'}>
                {exerciseGroup.restTime ? exerciseGroup.restTime.slice(exerciseGroup.restTime.search(/[1-9]/)) : ''}
              </Typography>
            </Button>
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>Sets</Typography>
              <Stack
                direction='row'
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <IconButton aria-label="add exercise set">
                  <RemoveCircleOutlinedIcon fontSize='small' />
                </IconButton>
                {exerciseGroup.exerciseSets.length}
                <IconButton aria-label="remove exercise set">
                  <AddCircleOutlinedIcon fontSize='small' />
                </IconButton>
              </Stack>
            </Stack>
            <List dense={true}>
              {exerciseGroup.exerciseSets.map(set => (
                <ListItem
                  disableGutters
                  key={set.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <MoreVertIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      {set.sort + 1}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={formattedRepsText(set)}
                  />
                </ListItem>
              ))}
            </List>
          </Stack>
        </CardContent>
      </Collapse>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show exercise group details"
          className='mx-auto p-0'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
