
import type { CompletedExerciseSet } from "../../../types/completedExerciseSet";
import useSetTags from "../../../hooks/useSetTags";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { badgeStyle, generalAvatarStyle } from "../../../utils/styling";

type Props = {
  set: CompletedExerciseSet,
  onDoubleClick?: (completedSet: CompletedExerciseSet) => void,
  isCurrent?: boolean
}

function displaySetText(set: CompletedExerciseSet) {
  return (set.weight ? `${set.weight} lbs x ${set.reps}` : `${set.reps}`) + ' reps'
}

export default function ExerciseHistoryItemSet({ set, onDoubleClick, isCurrent }: Props) {
  const { setTags } = useSetTags();
  const setTag = setTags?.find(tag => tag.id === set.setTagId);

  const handleDoubleClick = () => {
    if (onDoubleClick) {
      onDoubleClick(set);
    }
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onDoubleClick={handleDoubleClick}>
        <ListItemAvatar>
          <Tooltip title={setTag?.name} placement="right">
            <Badge
              slotProps={{ badge: { sx: { ...badgeStyle(setTag) } } }}
              badgeContent={setTag?.name[0] ?? ''}
            >
              <Avatar sx={{
                ...generalAvatarStyle,
                bgcolor: isCurrent ? 'primary.main' : '#E0E7F2',
                color: isCurrent ? 'white' : 'black',
              }}>
                {set.sort + 1}
              </Avatar>
            </Badge>
          </Tooltip>
        </ListItemAvatar>
        <ListItemText id={`list-label-${set.id}`} primary={displaySetText(set)} />
      </ListItemButton>
    </ListItem>
  );
}