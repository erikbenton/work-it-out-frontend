import { Avatar, Badge, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import type CompletedExerciseSet from "../../../types/completedExerciseSet";

type Props = {
  set: CompletedExerciseSet
}

function displaySetText(set: CompletedExerciseSet) {
  return (set.weight ? `${set.weight} lbs x ${set.reps}` : `${set.reps}`) + ' reps'
}

export default function ExerciseHistoryItemSet({ set }: Props) {
  return (
    <ListItem
      disablePadding
    >
      <ListItemButton>
        <ListItemAvatar>
          <Badge color="success" overlap="circular" badgeContent="W" variant="dot" invisible={set.setType !== 'warmup'}>
            <Avatar>{set.sort + 1}</Avatar>
          </Badge>
        </ListItemAvatar>
        <ListItemText id={`list-label-${set.id}`} primary={displaySetText(set)} />
      </ListItemButton>
    </ListItem>
  );
}