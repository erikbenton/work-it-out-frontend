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
import { Suspense, useState } from "react";
import useMuscleOptions from "../../../hooks/useMuscleOptions";
import { exerciseCategories } from "../../../types/exerciseCategory";
import { equipmentOptions } from "../../../types/equipmentOptions";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import ExpandMoreButton from "../../layout/ExpandMoreButton";
import { Badge, hexToRgb, useTheme } from "@mui/material";
import LoadingIcon from "../../layout/LoadingIcon";

export type ExerciseFilterConfig = {
  name?: string,
  muscles?: string[],
  equipment?: string[],
  categories?: string[]
}

type Props = {
  initFilter: ExerciseFilterConfig,
  setParentFilter: (newFilter: ExerciseFilterConfig) => void,
  color?: string,
  badgeColor?: string
}

export default function FilterExerciseButton({ initFilter, setParentFilter, color, badgeColor }: Props) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const primaryColor = hexToRgb(theme.palette.primary.main);
  const isParentFilterSet = Boolean(initFilter.name || initFilter.categories || initFilter.muscles || initFilter.equipment);

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <FilterDialog
        initFilter={initFilter}
        open={open}
        handleClose={handleClose}
        setParentFilter={setParentFilter}
      />
      <IconButton sx={{ color: color ?? 'black' }} onClick={() => setOpen(true)}>
        <Badge
          badgeContent={isParentFilterSet ? true : 0}
          variant="dot"
          slotProps={{ badge: { sx: { backgroundColor: badgeColor ?? primaryColor } } }}
        >
          <FilterAltIcon fontSize="large" />
        </Badge>
      </IconButton>
    </>
  )
}

type FilterDialogProps = {
  initFilter: ExerciseFilterConfig,
  open: boolean,
  handleClose: () => void,
  setParentFilter?: (newFilter: ExerciseFilterConfig) => void,
}

function FilterDialog({ initFilter, open, handleClose, setParentFilter }: FilterDialogProps) {
  const [filter, setFilter] = useState<ExerciseFilterConfig>(initFilter);

  const handleSubmit = (event?: React.SubmitEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    const trimmedFilter = { ...filter, name: filter.name?.trim() };
    if (setParentFilter) {
      setParentFilter(trimmedFilter);
    }
    setFilter(trimmedFilter);
    handleClose();
  }

  const handleCancel = () => {
    setFilter(initFilter);
    handleClose();
  }

  const handleClear = () => {
    setFilter({});
    if (setParentFilter) {
      setParentFilter({});
    }
    handleClose();
  }

  const isFilterSet = Boolean(filter.name || filter.categories || filter.muscles || filter.equipment);

  return (
    <Dialog fullWidth open={open} onClose={handleClose} disableRestoreFocus>
      <Suspense fallback={<LoadingIcon />}>
        <DialogContent>
          <form onSubmit={handleSubmit} id="exercise-filter-form">
            <Stack spacing={2}>
              <NameFilter filter={filter} setFilter={setFilter} />
              <CategoriesFilter filter={filter} setFilter={setFilter} />
              <MusclesFilter filter={filter} setFilter={setFilter} />
              <EquipmentFilter filter={filter} setFilter={setFilter} />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          {isFilterSet
            ? <>
              <Button sx={{ mr: 'auto', textTransform: 'capitalize' }} onClick={handleClear} color='error'>
                Clear
              </Button>
            </>
            : <></>
          }
          <Button sx={{ textTransform: 'capitalize' }} onClick={handleCancel}>
            Cancel
          </Button>
          <Button sx={{ textTransform: 'capitalize' }} type="submit" form="exercise-filter-form">
            Save
          </Button>
        </DialogActions>
      </Suspense>
    </Dialog >
  )
}

type FilterProps = {
  filter: ExerciseFilterConfig,
  setFilter: (value: React.SetStateAction<ExerciseFilterConfig>) => void
}

function NameFilter({ filter, setFilter }: FilterProps) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value === "" ? undefined : e.target.value;
    setFilter(curr => ({ ...curr, name }));
  }

  return (
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
  )
}

function CategoriesFilter({ filter, setFilter }: FilterProps) {
  const [expanded, setExpanded] = useState(!filter.categories ? false : filter.categories.length > 0);

  const handleExpand = () => {
    setExpanded(!expanded);
  }

  const handleCategories = (_event: React.MouseEvent<HTMLElement>, newCategories: string[]) => {
    const categories = newCategories.length === 0 ? undefined : newCategories;
    setFilter(curr => ({ ...curr, categories }));
  };

  return (
    <FormControl>
      <Box
        sx={{
          display: "flex",
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <FormLabel id="exercise-category-filter-group-label">
          Categories
          {filter.categories !== undefined &&
            <Chip sx={{ ml: 1 }} size="small" label={filter.categories.length} />
          }
        </FormLabel>
        <ExpandMoreButton
          expand={expanded}
          handleExpandClick={handleExpand}
          ariaLabel="show exercise categories options"
        />
      </Box>
      <Collapse in={expanded}>
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
      </Collapse>
    </FormControl>
  )
}

function MusclesFilter({ filter, setFilter }: FilterProps) {
  const { muscleOptions } = useMuscleOptions();
  const [expanded, setExpanded] = useState(!filter.muscles ? false : filter.muscles.length > 0);

  const handleExpand = () => {
    setExpanded(!expanded);
  }

  const handleMuscles = (_event: React.MouseEvent<HTMLElement>, newMuscles: string[]) => {
    const muscles = newMuscles.length === 0 ? undefined : newMuscles;
    setFilter(curr => ({ ...curr, muscles }));
  };

  return (
    <FormControl>
      <Box
        sx={{
          display: "flex",
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <FormLabel id="exercise-muscles-filter-group-label">
          Muscles
          {filter.muscles !== undefined &&
            <Chip sx={{ ml: 1 }} size="small" label={filter.muscles.length} />
          }
        </FormLabel>
        <ExpandMoreButton
          expand={expanded}
          handleExpandClick={handleExpand}
          ariaLabel="show exercise muscles options"
        />
      </Box>
      <Collapse in={expanded}>
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
      </Collapse>
    </FormControl>
  )
}

function EquipmentFilter({ filter, setFilter }: FilterProps) {
  const [expanded, setExpanded] = useState(!filter.equipment ? false : filter.equipment.length > 0);

  const handleExpand = () => {
    setExpanded(!expanded);
  }

  const handleEquipment = (_event: React.MouseEvent<HTMLElement>, newEquipment: string[]) => {
    const equipment = newEquipment.length === 0 ? undefined : newEquipment;
    setFilter(curr => ({ ...curr, equipment }));
  };

  return (
    <FormControl>
      <Box
        sx={{
          display: "flex",
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <FormLabel id="exercise-equipment-filter-group-label">
          Equipment
          {filter.equipment !== undefined &&
            <Chip sx={{ ml: 1 }} size="small" label={filter.equipment.length} />
          }
        </FormLabel>
        <ExpandMoreButton
          expand={expanded}
          handleExpandClick={handleExpand}
          ariaLabel="show exercise equipment options"
        />
      </Box>
      <Collapse in={expanded}>
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
      </Collapse>
    </FormControl>
  )
}