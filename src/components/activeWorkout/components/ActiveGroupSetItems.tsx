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

type Props = {
  index: number,
  set: ActiveExerciseSet,
  exerciseGroup: ActiveExerciseGroup
};

const generalAvatarStyle = {
  width: '35px',
  height: '35px',
  fontSize: 14,
}

export function CompletedActiveSet({ index, set, exerciseGroup }: Props) {
  const { dispatch, setEditing, setTags = [] } = useActiveWorkout();
  const setColor = setTags?.find(tag => tag.id === set.setTagId)?.colorRgb;

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
      >
        <ListItemAvatar>
          <Badge
            slotProps={{ badge: { style: { backgroundColor: setColor } } }}
            badgeContent=" "
            variant="dot"
          >
            <Avatar sx={{
              ...generalAvatarStyle,
              bgcolor: '#E0E7F2',
              color: 'gray',
            }}>
              {index + 1}
            </Avatar>
          </Badge>
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
  const setColor = setTags?.find(tag => tag.id === set.setTagId)?.colorRgb;
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
          <Badge
            slotProps={{ badge: { style: { backgroundColor: setColor } } }}
            badgeContent=" "
            variant="dot"
          >
            <Avatar sx={{
              ...generalAvatarStyle,
              bgcolor: 'primary.main',
              color: 'white',
            }}>
              {index + 1}
            </Avatar>
          </Badge>
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
  const setColor = setTags?.find(tag => tag.id === set.setTagId)?.colorRgb;
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
        <Badge
          slotProps={{ badge: { style: { backgroundColor: setColor } } }}
          badgeContent=" "
          variant="dot"
        >
          <Avatar sx={{
            ...generalAvatarStyle,
            bgcolor: '#E0E7F2',
            color: 'black'
          }}>
            {index + 1}
          </Avatar>
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={placeholderReps.length ? placeholderReps + ' reps' : `Set ${index + 1}`}
      />
    </ListItem>
  );
}