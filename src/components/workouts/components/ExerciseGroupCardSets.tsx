import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { Grow } from "@mui/material";
import useWorkoutForm from "../../../hooks/useWorkoutForm";
import type ExerciseGroup from "../../../types/exerciseGroup";
import ExerciseGroupSetInput from "./ExerciseGroupSetInput";

type Props = {
  exerciseGroup: ExerciseGroup
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
          <ExerciseGroupSetInput key={set.key} exerciseGroup={exerciseGroup} set={set} />
        ))}
      </List>
    </>
  );
}