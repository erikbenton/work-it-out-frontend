import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import useActiveWorkout from "../../../hooks/useActiveWorkout";
import { Grow } from "@mui/material";
import { useState } from "react";

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
          color: 'inherit'
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, p: 0 }}
            onClick={() => setOpen(false)}
          >
            <Grow
              timeout={100}
              in={open}
              onExited={() => navigate('/activeWorkout')}
            >
              <ArrowBackIcon />
            </Grow>
            <Typography sx={{ ml: 1 }} variant="h5" component="h2">
              {workout?.name}
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}