import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormLabel from "@mui/material/FormLabel";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Chip from "@mui/material/Chip";
import ExerciseHistoryItemSet from "../../exercises/components/ExerciseHistoryItemSet";
import type { CompletedExerciseSet } from "../../../types/completedExerciseSet";
import type { ExerciseCategory } from "../../../types/exerciseCategory";
import { useState } from "react";
import { parseDuration } from "../../../utils/formatters";
import useCompletedWorkoutForm from "../../../hooks/useCompletedWorkoutForm";
import type SetTagOption from "../../../types/setTagOption";
import type { CompletedExerciseGroup } from "../../../types/completedExerciseGroup";
import CompletedSetInputs from "./CompletedSetInputs";

type Props = {
  group: CompletedExerciseGroup,
  set: CompletedExerciseSet,
  category: ExerciseCategory
}

export default function CompletedGroupSet({ group, set, category }: Props) {
  const { editing, dispatch, setTags = [] } = useCompletedWorkoutForm();
  const [values, setValues] = useState<CompletedExerciseSet>(set);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (editing) {
      setOpen(true);
    }
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setValues(prev => ({ ...prev, setTagId: set.setTagId }));
    handleClose();
  }

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({
      type: 'updateSet',
      payload: {
        group,
        set: { ...values, targetDuration: parseDuration(values.targetDuration) }
      }
    });

    handleClose();
  };

  const handleSetTypeChange = (_event: React.MouseEvent<HTMLElement>, setTag: SetTagOption | undefined) => {
    if (!setTag) return;
    const newSet = { ...values, setTagId: setTag.id };
    setValues(newSet);
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleCancel} disableRestoreFocus>
        <DialogContent>
          <form onSubmit={handleSubmit} id="exercise-set-input-form">
            <Stack spacing={2}>
              <FormLabel id="repetition-label">Targets</FormLabel>
              <CompletedSetInputs category={category} setValues={setValues} values={values} />
              <Stack sx={{ mt: 2 }}>
                <FormLabel id="set-tag-group-label">Tag</FormLabel>
                <ToggleButtonGroup
                  id="set-tag-group-label"
                  value={setTags.find(st => st.id === values.setTagId)}
                  exclusive
                  onChange={handleSetTypeChange}
                  aria-label="Tag"
                  sx={{ flexWrap: 'wrap' }}
                >
                  {setTags.map(option => (
                    <ToggleButton
                      key={option.id}
                      className="rounded-full"
                      value={option}
                      sx={{ border: 'none', p: 0, mr: 1, mt: 1 }}
                    >
                      <Chip
                        label={option.name}
                        variant="outlined"
                        size="small"
                        className="capitalize"
                        sx={{ border: `1px solid ${option.colorRgb}` }}
                      />
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Stack>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" form="exercise-set-input-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <ExerciseHistoryItemSet key={set.id} set={set} category={category} onClick={handleOpen} />
    </>
  )
}