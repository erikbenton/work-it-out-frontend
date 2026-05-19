import Box from "@mui/material/Box";
import useProgramForm from "../../../hooks/useProgramForm";
import { Grow, IconButton, Stack } from "@mui/material";
import LoadingIcon from "../../layout/LoadingIcon";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import ProgramNameInput from "./ProgramNameInput";
import ProgramWorkoutCard from "./ProgramWorkoutCard";


export default function ProgramForm() {
  const { saving, editing, workouts, handleEditSaveClick, getProgramOptions } = useProgramForm();

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
        </Stack >
        <Stack spacing={1} sx={{ pb: 3, px: 1 }} >
          {workouts.map(workout => (
            <ProgramWorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </Stack>
      </Box>
    </>
  )
}