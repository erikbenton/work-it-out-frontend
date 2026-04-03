import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type Exercise from "../../../types/exercise";
import CheckIcon from '@mui/icons-material/Check';
import { capitalize } from "../../../utils/formatters";

type Props = {
  exercise: Exercise,
  selected: number[],
  setSelected: React.Dispatch<React.SetStateAction<number[]>>,
  limit?: number
}

export default function ExerciseSelectionItem({ exercise, selected, setSelected, limit }: Props) {

  const alreadySelected = selected.findIndex(s => s === exercise.id) > -1;

  const handleClick = () => {
    if (alreadySelected) {
      setSelected(prev => prev.filter(id => id !== exercise.id));
    } else {
      const newSelection = limit && selected.length >= limit
        ? selected.concat(exercise.id).slice(selected.length - limit + 1)
        : selected.concat(exercise.id);
      setSelected(newSelection);
    }
  }

  return (
    <ListItem
      key={exercise.id}
      disableGutters
      disablePadding
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
        <ListItemText
          primary={exercise.name}
          secondary={exercise.muscles?.map(m => capitalize(m.name)).join(', ')}
        />
      </ListItemButton>
    </ListItem>
  )
}