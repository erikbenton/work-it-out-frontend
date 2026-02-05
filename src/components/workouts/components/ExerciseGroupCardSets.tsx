import Stack from "@mui/material/Stack"
import type ExerciseSet from "../../../types/exerciseSet"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import ListItemText from "@mui/material/ListItemText"
import ListItem from "@mui/material/ListItem"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { Grow, ListItemButton } from "@mui/material"
import useWorkoutForm from "../../../hooks/useWorkoutForm"
import type ExerciseGroup from "../../../types/exerciseGroup"

type Props = {
  exerciseGroup: ExerciseGroup
}

function formattedRepsText(set: ExerciseSet): string {
  return (`${set.minReps ?? ""}` +
    `${set.minReps && set.maxReps ? " - " : ""}` +
    `${set.maxReps ?? ""} Reps`);
}

export default function ExerciseGroupCardSets({ exerciseGroup }: Props) {
  const { editing, dispatch } = useWorkoutForm();

  const handleRemoveSet = () => {
    const numberOfSets = exerciseGroup.exerciseSets.length;
    dispatch({
      type: 'removeGroupSet',
      payload: {
        group: exerciseGroup,
        set: exerciseGroup.exerciseSets[numberOfSets - 1]
      }
    });
  }

  const handleAddSet = () => {
    dispatch({ type: 'addGroupSet', payload: { group: exerciseGroup } })
  }

  return (
    <>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Sets</Typography>
        <Grow in={editing}>
          <Stack
            direction='row'
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton aria-label="remove exercise set" onClick={handleRemoveSet}>
              <RemoveCircleOutlinedIcon fontSize='small' />
            </IconButton>
            {exerciseGroup.exerciseSets.length}
            <IconButton aria-label="add exercise set" onClick={handleAddSet}>
              <AddCircleOutlinedIcon fontSize='small' />
            </IconButton>
          </Stack>
        </Grow>
      </Stack>
      <List dense={true}>
        {exerciseGroup.exerciseSets.map(set => (
          <ListItem
            disableGutters
            key={set.key}
            secondaryAction={
              <Grow in={editing}>
                <IconButton edge="end" aria-label="delete">
                  <MoreVertIcon />
                </IconButton>
              </Grow>
            }
          >
            <ListItemButton disableGutters className="rounded">
              <ListItemAvatar>
                <Avatar>
                  {set.sort + 1}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={formattedRepsText(set)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}