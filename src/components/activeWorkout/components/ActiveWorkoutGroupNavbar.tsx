import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import useActiveWorkout from "../../../hooks/useActiveWorkout";
import { Grow, Stack } from "@mui/material";
import { useState } from "react";
import ElapsedTimer from "./ElapsedTimer";
import CountdownTimer from "./CountdownTimer";

export default function ActiveWorkoutGroupNavbar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { workout } = useActiveWorkout();

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
            <Stack direction='row'>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 1, p: 0, ml: 1 }}
                onClick={() => setOpen(false)}
              >
                <Grow
                  timeout={100}
                  in={open}
                  onExited={() => navigate('/activeWorkout')}
                >
                  <ArrowBackIcon />
                </Grow>
              </IconButton>
              <Typography variant="h5" component="h2">
                {workout?.name}
              </Typography>
            </Stack>
            {workout &&
              <Box sx={{ mr: 1 }}>
                <Stack direction='row' spacing={2}>
                  {workout.currentRestTime && workout.currentRestStart &&
                    <CountdownTimer
                      key={workout.currentRestStart}
                      startTime={workout.currentRestStart}
                      duration={workout.currentRestTime}
                    />
                  }
                  <ElapsedTimer startTime={workout.startTime} />
                </Stack>
              </Box>
            }
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}