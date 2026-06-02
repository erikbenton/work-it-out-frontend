import { useMediaQuery, List, ListSubheader, ListItem, useTheme, Dialog, Slide, DialogContent, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import type Exercise from "../../../types/exercise";
import React, { useState } from "react";
import { type TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import ExerciseSelectionItem from "./ExerciseSelectionItem";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import FilterExerciseButton from "./ExerciseListFilter";
import { orange } from "@mui/material/colors";
import { useFilteredExercises } from "../../../hooks/useFilteredExercises";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  open: boolean,
  handleClose: () => void,
  addExercises: (exercises: number[]) => void,
  limit?: number
}

export default function ExerciseSelect({ open, handleClose, addExercises, limit }: Props) {
  const { filteredExercises, filter, setFilter } = useFilteredExercises();
  const [selected, setSelected] = useState<number[]>([]);
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { height } = useWindowDimensions();

  const handleSave = () => {
    addExercises(selected);
    handleCloseDialog();
  }

  const handleCloseDialog = () => {
    setSelected([]);
    handleClose();
  };

  const exerciseLetterMap = new Map<string, Exercise[]>();
  const keys: string[] = [];
  filteredExercises.forEach(exer => {
    const letter = exer.name ? exer.name[0].toUpperCase() : '';
    const entry = exerciseLetterMap.get(letter);
    if (entry) {
      exerciseLetterMap.set(letter, entry.concat(exer));
    } else {
      exerciseLetterMap.set(letter, [exer]);
      keys.push(letter);
    }
  });

  const sortedKeys = keys.sort();

  const headerOffsetPixels = mobileScreen ? 56 : 64;

  return (
    <Dialog
      disableRestoreFocus
      fullScreen={mobileScreen}
      fullWidth
      maxWidth='sm'
      open={open}
      onClose={handleCloseDialog}
      slots={{
        transition: Transition,
      }}
      slotProps={{
        paper: {
          style: {
            minHeight: '100%',
            maxHeight: '100%',
          }
        }
      }}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Exercises
          </Typography>
          <FilterExerciseButton
            initFilter={filter}
            setParentFilter={setFilter}
            color="white"
            badgeColor={orange[500]}
          />
          <Button autoFocus color="inherit" onClick={handleSave}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ p: 0 }}>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: `${height - headerOffsetPixels}px`,
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          {sortedKeys.map((key) => (
            <li key={`exercises-${key}`}>
              <ul>
                <ListSubheader>{key}</ListSubheader>
                {(exerciseLetterMap.get(key) ?? []).map((ex) => (
                  <ExerciseSelectionItem
                    key={ex.id}
                    selected={selected}
                    setSelected={setSelected}
                    exercise={ex}
                    limit={limit}
                  />
                ))}

              </ul>
            </li>
          ))}
          <ListItem sx={{ my: 2 }}></ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}