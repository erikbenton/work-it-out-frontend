import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import NavbarDrawer from "./NavbarDrawer";
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { Typography } from "@mui/material";
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';

export type PageLink = {
  text: string,
  url: string,
  icon: (active?: boolean) => ReactElement,
  active?: boolean
}

const pages: PageLink[] = [
  {
    text: "Home",
    url: "/",
    icon: (active) => <HomeIcon sx={{ color: active ? 'white' : 'primary.main' }} />
  },
  {
    text: "Training",
    url: "/activeWorkout",
    icon: (active) => <DirectionsRunIcon sx={{ color: active ? 'white' : 'primary.main' }} />
  },
  {
    text: "Exercises",
    url: "/exercises",
    icon: (active) => <FitnessCenterIcon sx={{ color: active ? 'white' : 'primary.main' }} />
  },
  {
    text: "Workouts",
    url: "/workouts",
    icon: (active) => <NoteAltOutlinedIcon sx={{ color: active ? 'white' : 'primary.main' }} />
  },
  {
    text: "History",
    url: "/completedWorkouts",
    icon: (active) => <EventAvailableOutlinedIcon sx={{ color: active ? 'white' : 'primary.main' }} />
  },
];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}
        >
          {/* Collapsed Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              sx={{ height: '64px' }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <NavbarDrawer
              open={Boolean(anchorElNav)}
              links={pages}
              handleClose={handleCloseNavMenu}
            />
          </Box>

          {/* Expanded Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {pages.map((page) => (
              <Link to={page.url} key={page.text}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ height: '100%', color: "white", display: "block" }}
                >
                  {page.text}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <Typography variant="h5" alignContent='center'>
              Work-It-Out
            </Typography>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
