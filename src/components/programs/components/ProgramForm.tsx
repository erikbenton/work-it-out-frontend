import Box from "@mui/material/Box";
import useProgramForm from "../../../hooks/useProgramForm";
import { Grow, IconButton, Stack, Typography } from "@mui/material";
import LoadingIcon from "../../layout/LoadingIcon";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import ProgramNameInput from "./ProgramNameInput";
import ProgramWorkoutCard from "./ProgramWorkoutCard";
import { checkPluralization } from "../../../utils/formatters";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Suspense, useState } from "react";
import WorkoutSelect from "./WorkoutSelect";


export default function ProgramForm() {
  const { saving, editing, program, workouts, handleEditSaveClick, getProgramOptions } = useProgramForm();
  const [selectingWorkouts, setSelectingWorkouts] = useState(false);

  const handleStartSelectingWokouts = () => {
    setSelectingWorkouts(true);
  };

  const handleStopSelectingWorkouts = () => {
    setSelectingWorkouts(false);
  }

  const programOptions = getProgramOptions();

  return (
    <>
      {saving &&
        <Box position="fixed" sx={{ zIndex: 99, width: '100%', height: '100%' }}>
          <LoadingIcon />
        </Box>
      }
      <Box
        className="w-full md:w-2/3"
        sx={{ mt: 1, opacity: saving ? 0.5 : undefined }}
        role={editing ? 'form' : 'div'}
      >
        <Stack
          direction="row"
          spacing={0}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ProgramNameInput />
          <IconButton color="primary" sx={{ mx: 1 }} onClick={handleEditSaveClick}>
            <Grow in={editing}>
              <CheckIcon fontSize="medium" sx={{ position: 'absolute' }} />
            </Grow>
            <Grow in={!editing}>
              <EditIcon fontSize="medium" sx={{ position: 'absolute' }} />
            </Grow>
          </IconButton>
          <VerticalIconMenu
            buttonId={"program-options"}
            menuItems={programOptions}
            size="medium"
          />
        </Stack>
        <Suspense fallback={<LoadingIcon label='Exercises' />}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              px: 1
            }}
          >
            <Typography variant="body1" component="span">
              {program.workoutIds.length} {checkPluralization("Workout", program.workoutIds.length)}
            </Typography>
            <Grow in={editing} >
              <IconButton color="primary" onClick={handleStartSelectingWokouts}>
                <AddCircleOutlinedIcon fontSize="large" />
              </IconButton>
            </Grow>
          </Stack>
          <Stack spacing={1} sx={{ pb: 3, px: 1 }} >
            {workouts.map(workout => (
              <ProgramWorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </Stack>
          <WorkoutSelect
            open={selectingWorkouts}
            handleClose={handleStopSelectingWorkouts}
          />
        </Suspense>
        <Box sx={{ height: '10vh', minHeight: '10vh' }}></Box>
      </Box>
    </>
  )
}