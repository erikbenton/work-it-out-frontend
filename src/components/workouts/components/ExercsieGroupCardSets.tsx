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

type Props = {
  exerciseSets: ExerciseSet[]
}

function formattedRepsText(set: ExerciseSet): string {
  return (`${set.minReps ?? ""}` +
    `${set.minReps && set.maxReps ? " - " : ""}` +
    `${set.maxReps ?? ""} Reps`);
}

export default function ExerciseGroupCardSets({ exerciseSets }: Props) {

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
          {exerciseSets.length}
          <IconButton aria-label="remove exercise set">
            <AddCircleOutlinedIcon fontSize='small' />
          </IconButton>
        </Stack>
      </Stack>
      <List dense={true}>
        {exerciseSets.map(set => (
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
    </>
  )
}