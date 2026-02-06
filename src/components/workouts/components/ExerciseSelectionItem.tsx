import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type Exercise from "../../../types/exercise";
import CheckIcon from '@mui/icons-material/Check';

type Props = {
  exercise: Exercise,
  selected: number[],
  setSelected: React.Dispatch<React.SetStateAction<number[]>>
}

export default function ExerciseSelectionItem({ exercise, selected, setSelected }: Props) {

  const alreadySelected = selected.findIndex(s => s === exercise.id) > -1;

  const handleClick = () => {
    if (alreadySelected) {
      setSelected(prev => prev.filter(id => id !== exercise.id));
    } else {
      setSelected(selected.concat(exercise.id));
    }
  }

  return (
    <ListItem key={exercise.id} disableGutters disablePadding

      secondaryAction={
        alreadySelected
          ? <IconButton
            edge="end"
            aria-label="added-exercise"
            sx={{ mr: 1, color: 'primary.main' }}
          >
            <CheckIcon />
          </IconButton>
          : <></>
      }>
      <ListItemButton
        key={exercise.id}
        onClick={handleClick}
      >
        <ListItemText primary={exercise.name} secondary={exercise.equipment} />
      </ListItemButton>
    </ListItem>
  )
}