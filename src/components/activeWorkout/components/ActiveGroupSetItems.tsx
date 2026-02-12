import ListItem from "@mui/material/ListItem";
import type ActiveExerciseSet from "../../../types/activeExerciseSet";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import useActiveWorkout from "../../../hooks/useActiveWorkout";
import MoreVertIcon from '@mui/icons-material/MoreVert';

type Props = {
  index: number,
  set: ActiveExerciseSet
};

const generalAvatarStyle = {
  width: '35px',
  height: '35px',
  fontSize: 14,
}

export function CompletedActiveSet({ index, set }: Props) {

  const weight = set.weight ? `${set.weight} lbs x ` : '';
  const reps = `${set.reps ?? 0} rep${set.reps !== 1 ? 's' : ''}`

  return (
    <ListItem
      sx={{ p: 0 }}
      secondaryAction={
        <IconButton edge="end" aria-label="set-options">
          <MoreVertIcon />
        </IconButton>
      }
    >
      <ListItemButton
        disableGutters
        sx={{ px: 1, color: 'gray' }}
      >
        <ListItemAvatar>
          <Avatar sx={{
            ...generalAvatarStyle,
            bgcolor: '#E0E7F2',
            color: 'gray',
          }}>
            {index + 1}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          slotProps={{ primary: { fontWeight: 100 } }}
          primary={`${weight} ${reps}`}
        />
      </ListItemButton>
    </ListItem>
  );
}

export function CurrentActiveSet({ index }: Props) {
  const { setEditing } = useActiveWorkout();

  return (
    <ListItem
      sx={{ p: 0 }}
      secondaryAction={
        <IconButton edge="end" aria-label="set-options">
          <MoreVertIcon />
        </IconButton>
      }
    >
      <ListItemButton
        disableGutters
        sx={{ px: 1 }}
        onClick={() => setEditing(curr => !curr)}
      >
        <ListItemAvatar>
          <Avatar sx={{
            ...generalAvatarStyle,
            bgcolor: 'primary.main',
            color: 'white',
          }}>
            {index + 1}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`Set ${index + 1}`}
        />
      </ListItemButton>
    </ListItem>
  );
}

export function ActiveGroupSet({ index }: Props) {

  return (
    <ListItem
      sx={{ p: 1 }}
      secondaryAction={
        <IconButton edge="end" aria-label="set-options">
          <MoreVertIcon />
        </IconButton>
      }>
      <ListItemAvatar>
        <Avatar sx={{
          ...generalAvatarStyle,
          bgcolor: '#E0E7F2',
          color: 'black'
        }}>
          {index + 1}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`Set ${index + 1}`}
      />
    </ListItem>
  );
}