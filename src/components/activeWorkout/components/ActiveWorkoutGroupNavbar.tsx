import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import useActiveWorkout from "../../../hooks/useActiveWorkout";
import { Collapse, Stack } from "@mui/material";
import { useState } from "react";
import ElapsedTimer from "./ElapsedTimer";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import { useCompletedWorkouts } from "../../../hooks/useCompletedWorkouts";

export default function ActiveWorkoutGroupNavbar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { workout, dispatch, handleFinishWorkout } = useActiveWorkout();
  const { services } = useCompletedWorkouts();

  const handleClearWorkout = () => {
    navigate('/training');
    dispatch({ type: 'endWorkout' });
  }

  if (workout === null) {
    return (
      <Box className="w-full md:w-2/3" sx={{ mt: 1, px: 1 }}>
        <Typography variant="h5" component='h2'>
          No workout selected.
        </Typography>
      </Box>
    );
  }

  const menuItems = [
    {
      label: 'Finish Workout',
      handleClick: () => handleFinishWorkout(services),
    },
    {
      label: "Cancel Workout",
      handleClick: handleClearWorkout,
      sx: { color: 'error.main' }
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, mb: 1 }}>
      <AppBar
        position="static"
        id="active-workout-navbar"
        elevation={0}
        sx={{
          backgroundColor: 'inherit',
          color: 'inherit',
        }}
      >
        <Toolbar sx={{ px: 0 }} disableGutters>
          <Stack
            direction="row"
            spacing={0}
            sx={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction='row' sx={{ alignItems: 'center' }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mx: 1, p: 0 }}
                onClick={() => setOpen(false)}
              >

                <Collapse
                  orientation="horizontal"
                  timeout={100}
                  in={open}
                  appear={true}
                  onExited={() => navigate('/training')}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', pr: 1 }}>
                    <ArrowBackIcon />
                  </Box>
                </Collapse>
              </IconButton>
              <ElapsedTimer startTime={workout.startTime} />
            </Stack>
            <VerticalIconMenu menuItems={menuItems} buttonId={`${workout.id}`} />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}