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
import useUser from "../../hooks/useUser";
import useActiveWorkout from "../../hooks/useActiveWorkout";
import CountdownTimer from "../activeWorkout/components/CountdownTimer";

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
    url: "/training",
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
    url: "/history",
    icon: (active) => <EventAvailableOutlinedIcon sx={{ color: active ? 'white' : 'primary.main' }} />
  },
];

export default function Navbar() {
  const { userInfo } = useUser();
  const { workout: activeWorkout, saving } = useActiveWorkout();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navbarLinks = userInfo.isLoggedIn ? pages : [pages[0]];

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
              disabled={saving}
            >
              <MenuIcon />
            </IconButton>
            <NavbarDrawer
              open={Boolean(anchorElNav)}
              links={navbarLinks}
              handleClose={handleCloseNavMenu}
            />
          </Box>

          {/* Expanded Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {navbarLinks.map((page) => (
              <Link to={saving ? '#' : page.url} key={page.text}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ height: '100%', color: "white", display: "block" }}
                  disabled={saving}
                >
                  {page.text}
                </Button>
              </Link>
            ))}
          </Box>

          {activeWorkout && activeWorkout.currentRestStart && activeWorkout.currentRestTime && !saving &&
            <Box sx={{ mr: 2 }}>
              <CountdownTimer
                key={activeWorkout.currentRestStart}
                startTime={activeWorkout.currentRestStart}
                duration={activeWorkout.currentRestTime}
                chipSx={{ color: 'white' }}
              />
            </Box>
          }

          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <Typography
              variant="h5"
              alignContent='center'
            >
              <Link to={saving ? '#' : '/'}>
                Work-It-Out
              </Link>
            </Typography>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
