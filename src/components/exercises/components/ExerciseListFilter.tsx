import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from "react";
import useMuscleOptions from "../../../hooks/useMuscleOptions";
import { exerciseCategories } from "../../../types/exerciseCategory";
import { equipmentOptions } from "../../../types/equipmentOptions";

export type ExerciseFilterConfig = {
  name?: string,
  muscles?: string[],
  equipment?: string[],
  categories?: string[]
}

type FilterProps = {
  setParentFilter?: (newFilter: ExerciseFilterConfig) => void
}

export default function FilterExerciseButton({ setParentFilter }: FilterProps) {
  const { muscleOptions } = useMuscleOptions();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<ExerciseFilterConfig>({});

  const handleSubmit = (event?: React.SubmitEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    if (setParentFilter) {
      const parsedFilter = { ...filter, name: filter.name?.toLocaleLowerCase() }
      setParentFilter(parsedFilter);
    }
    handleClose();
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value === "" ? undefined : e.target.value;
    setFilter(curr => ({ ...curr, name }));
  }

  const handleMuscles = (_event: React.MouseEvent<HTMLElement>, newMuscles: string[]) => {
    const muscles = newMuscles.length === 0 ? undefined : newMuscles;
    setFilter(curr => ({ ...curr, muscles }));
  };

  const handleCategories = (_event: React.MouseEvent<HTMLElement>, newCategories: string[]) => {
    const categories = newCategories.length === 0 ? undefined : newCategories;
    setFilter(curr => ({ ...curr, categories }));
  };

  const handleEquipment = (_event: React.MouseEvent<HTMLElement>, newEquipment: string[]) => {
    const equipment = newEquipment.length === 0 ? undefined : newEquipment;
    setFilter(curr => ({ ...curr, equipment }));
  };

  const handleClear = () => {
    setFilter({});
    if (setParentFilter) {
      setParentFilter({});
    }
    handleClose();
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose} disableRestoreFocus>
        <DialogContent>
          <form onSubmit={handleSubmit} id="exercise-filter-form">
            <Stack spacing={2}>
              <FormControl>
                <TextField
                  id="name-filter"
                  name="name-filter"
                  label="Name Filter"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={filter.name ?? ""}
                  onChange={handleNameChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel id="exercise-category-filter-group-label">Categories</FormLabel>
                <ToggleButtonGroup
                  value={filter.categories ?? []}
                  onChange={handleCategories}
                  aria-label="Categories filter"
                  sx={{ flexWrap: 'wrap' }}
                >
                  {exerciseCategories.map(category => (
                    <ToggleButton key={category} className="rounded-full" value={category} sx={{ border: 'none', p: 0, mr: 1, mt: 1 }}>
                      <Chip label={category} variant="outlined" sx={{ textTransform: 'capitalize' }} />
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="exercise-muscles-filter-group-label">Muscles</FormLabel>
                <ToggleButtonGroup
                  value={filter.muscles ?? []}
                  onChange={handleMuscles}
                  aria-label="Muscles filter"
                  sx={{ flexWrap: 'wrap' }}
                >
                  {muscleOptions.map(option => (
                    <ToggleButton key={option.name} className="rounded-full" value={option.name} sx={{ border: 'none', p: 0, mr: 1, mt: 1 }}>
                      <Chip label={option.name} variant="outlined" sx={{ textTransform: 'capitalize' }} />
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="exercise-equipment-filter-group-label">Equipment</FormLabel>
                <ToggleButtonGroup
                  value={filter.equipment ?? []}
                  onChange={handleEquipment}
                  aria-label="Equipment filter"
                  sx={{ flexWrap: 'wrap' }}
                >
                  {equipmentOptions.map(equipment => (
                    <ToggleButton key={equipment} className="rounded-full" value={equipment} sx={{ border: 'none', p: 0, mr: 1, mt: 1 }}>
                      <Chip label={equipment} variant="outlined" sx={{ textTransform: 'capitalize' }} />
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </FormControl>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          {filter.name || filter.categories || filter.muscles || filter.equipment
            ? <>
              <Button sx={{ mr: 'auto', textTransform: 'capitalize' }} onClick={handleClear} color='error'>
                Clear
              </Button>
            </>
            : <></>
          }
          <Button sx={{ textTransform: 'capitalize' }} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ textTransform: 'capitalize' }} type="submit" form="exercise-filter-form">
            Save
          </Button>
        </DialogActions>
      </Dialog >
      <IconButton color="default" onClick={() => setOpen(true)}>
        <FilterAltIcon fontSize="large" />
      </IconButton>
    </>
  )
}