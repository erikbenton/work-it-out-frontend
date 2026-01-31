import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from "@mui/material/IconButton";

type Props = {
  exerciseName: string,
  bodyPart: string,
  numberOfSets: number
}

export default function ExerciseGroupCardTitle({ exerciseName, bodyPart, numberOfSets }: Props) {

  return (
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'red' }} aria-label="exercise group">
          {bodyPart[0].toUpperCase()}
        </Avatar>
      }
      action={
        <IconButton aria-label="exercise group settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={exerciseName}
      subheader={`${numberOfSets} Sets`}
      slotProps={{ title: { variant: 'h6' } }}
      className='pb-0'
    />
  );
}