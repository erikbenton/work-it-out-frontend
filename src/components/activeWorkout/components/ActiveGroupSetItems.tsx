import ListItem from "@mui/material/ListItem";
import type ActiveExerciseSet from "../../../types/activeExerciseSet";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import useActiveWorkout from "../../../hooks/useActiveWorkout";
import type ActiveExerciseGroup from "../../../types/activeExerciseGroup";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import Badge from "@mui/material/Badge";
import { Tooltip } from "@mui/material";
import type { CompletedExerciseSet } from "../../../types/completedExerciseSet";
import { devConsole } from "../../../utils/debugLogger";
import { badgeStyle, generalAvatarStyle } from "../../../utils/styling";

type Props = {
  index: number,
  set: ActiveExerciseSet,
  exerciseGroup: ActiveExerciseGroup
};

interface CompletedProps extends Props {
  onDoubleClick: (completedSet: CompletedExerciseSet | ActiveExerciseSet) => void,
}

export function CompletedActiveSet({ index, set, exerciseGroup, onDoubleClick }: CompletedProps) {
  const { dispatch, setEditing, setTags = [] } = useActiveWorkout();
  const setTag = setTags?.find(tag => tag.id === set.setTagId);

  const menuItems = [
    {
      label: "Edit",
      handleClick: () => {
        dispatch({
          type: 'updateSet',
          payload: { group: exerciseGroup, set: { ...set, completed: false } }
        });
        setEditing(true);
      },
    },
    {
      label: "Delete",
      handleClick: () => {
        dispatch({ type: 'removeGroupSet', payload: { group: exerciseGroup, set } });
      },
      sx: { color: 'error.main' }
    },
  ];

  const handleDoubleClick = () => {
    devConsole('here')
    onDoubleClick(set)
  }

  const weight = set.weight ? `${set.weight} lbs x ` : '';
  const reps = `${set.reps ?? 0} rep${set.reps !== 1 ? 's' : ''}`

  return (
    <ListItem
      sx={{ p: 0 }}
      secondaryAction={
        <VerticalIconMenu
          buttonId={'set-' + set.key + "-options"}
          menuItems={menuItems}
          edge="end"
        />
      }
    >
      <ListItemButton
        disableGutters
        sx={{ px: 1, color: 'gray' }}
        onDoubleClick={handleDoubleClick}
      >
        <ListItemAvatar>
          <Tooltip title={setTag?.name} placement="right">
            <Badge
              slotProps={{ badge: { sx: { ...badgeStyle(setTag) } } }}
              badgeContent={setTag?.name[0] ?? ''}
            >
              <Avatar sx={{
                ...generalAvatarStyle,
                bgcolor: '#E0E7F2',
                color: 'gray',
              }}>
                {index + 1}
              </Avatar>
            </Badge>
          </Tooltip>
        </ListItemAvatar>
        <ListItemText
          slotProps={{ primary: { fontWeight: 100 } }}
          primary={`${weight} ${reps}`}
        />
      </ListItemButton>
    </ListItem>
  );
}

export function CurrentActiveSet({ index, set, exerciseGroup }: Props) {
  const { setEditing, dispatch, setTags = [] } = useActiveWorkout();
  const setTag = setTags?.find(tag => tag.id === set.setTagId);
  const minReps = set.minReps ? `${set.minReps}` : '';
  const maxReps = set.maxReps ? `${set.maxReps}` : '';
  const hyphen = (set.minReps && set.maxReps) ? ' - ' : '';
  const placeholderReps = minReps + hyphen + maxReps;
  const menuItems = [
    {
      label: "Delete",
      handleClick: () => {
        dispatch({ type: 'removeGroupSet', payload: { group: exerciseGroup, set } });
      },
      sx: { color: 'error.main' }
    },
  ];

  return (
    <ListItem
      sx={{ p: 0 }}
      secondaryAction={
        <VerticalIconMenu
          buttonId={'set-' + set.key + "-options"}
          menuItems={menuItems}
          edge="end"
        />
      }
    >
      <ListItemButton
        disableGutters
        sx={{ px: 1 }}
        onClick={() => setEditing(curr => !curr)}
      >
        <ListItemAvatar>
          <Tooltip title={setTag?.name} placement="right">

            <Badge
              slotProps={{ badge: { sx: { ...badgeStyle(setTag) } } }}
              badgeContent={setTag?.name[0] ?? ''}
            >
              <Avatar sx={{
                ...generalAvatarStyle,
                bgcolor: 'primary.main',
                color: 'white',
              }}>
                {index + 1}
              </Avatar>
            </Badge>
          </Tooltip>
        </ListItemAvatar>
        <ListItemText
          primary={placeholderReps.length ? placeholderReps + ' reps' : `Set ${index + 1}`}
        />
      </ListItemButton>
    </ListItem>
  );
}

export function ActiveGroupSet({ index, set, exerciseGroup }: Props) {
  const { dispatch, setTags = [] } = useActiveWorkout();
  const setTag = setTags?.find(tag => tag.id === set.setTagId);
  const minReps = set.minReps ? `${set.minReps}` : '';
  const maxReps = set.maxReps ? `${set.maxReps}` : '';
  const hyphen = (set.minReps && set.maxReps) ? ' - ' : '';
  const placeholderReps = minReps + hyphen + maxReps;

  const menuItems = [
    {
      label: "Delete",
      handleClick: () => {
        dispatch({ type: 'removeGroupSet', payload: { group: exerciseGroup, set } });
      },
      sx: { color: 'error.main' }
    },
  ];

  return (
    <ListItem
      sx={{ p: 1 }}
      secondaryAction={
        <VerticalIconMenu
          buttonId={'set-' + set.key + "-options"}
          menuItems={menuItems}
          edge="end"
        />
      }>
      <ListItemAvatar>
        <Tooltip title={setTag?.name} placement="right">

          <Badge
            slotProps={{ badge: { sx: { ...badgeStyle(setTag) } } }}
            badgeContent={setTag?.name[0] ?? ''}
          >
            <Avatar sx={{
              ...generalAvatarStyle,
              bgcolor: '#E0E7F2',
              color: 'black'
            }}>
              {index + 1}
            </Avatar>
          </Badge>
        </Tooltip>
      </ListItemAvatar>
      <ListItemText
        primary={placeholderReps.length ? placeholderReps + ' reps' : `Set ${index + 1}`}
      />
    </ListItem>
  );
}