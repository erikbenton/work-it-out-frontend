import { Avatar, Badge, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import type { CompletedExerciseSet } from "../../../types/completedExerciseSet";
import type SetTagOption from "../../../types/setTagOption";
import useSetTags from "../../../hooks/useSetTags";

type Props = {
  set: CompletedExerciseSet
}

function displaySetText(set: CompletedExerciseSet) {
  return (set.weight ? `${set.weight} lbs x ${set.reps}` : `${set.reps}`) + ' reps'
}

const generalAvatarStyle = {
  width: '30px',
  height: '30px',
  fontSize: 14,
}

const badgeStyle = (setTag?: SetTagOption) => {
  return {
    textTransform: 'uppercase',
    color: 'white',
    fontSize: '0.6rem',
    backgroundColor: setTag?.colorRgb ?? 'inherit',
    minWidth: '16px',
    width: '16px',
    height: '16px',
    borderRadius: '50%'
  };
}

export default function ExerciseHistoryItemSet({ set }: Props) {
  const { setTags } = useSetTags();
  const setTag = setTags?.find(tag => tag.id === set.setTagId);

  return (
    <ListItem
      disablePadding
    >
      <ListItemButton>
        <ListItemAvatar>
          <Badge
            slotProps={{ badge: { sx: { ...badgeStyle(setTag) } } }}
            badgeContent={setTag?.name[0] ?? ''}
          >
            <Avatar sx={{
              ...generalAvatarStyle,
              bgcolor: '#E0E7F2',
              color: 'black'
            }}>
              {set.sort + 1}
            </Avatar>
          </Badge>
        </ListItemAvatar>
        <ListItemText id={`list-label-${set.id}`} primary={displaySetText(set)} />
      </ListItemButton>
    </ListItem>
  );
}