import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import NavbarDrawer from "./NavbarDrawer";
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

export type PageLink = {
  text: string,
  url: string,
  icon: ReactElement
}

const pages: PageLink[] = [
  { text: "Home", url: "/", icon: <HomeIcon color="primary" /> },
  { text: "Exercises", url: "/exercises", icon: <FitnessCenterIcon color="primary" /> },
  { text: "Workouts", url: "/workouts", icon: <NoteAltIcon color="primary" /> },
  { text: "History", url: "/completedWorkouts", icon: <AssignmentTurnedInIcon color="primary" /> },
  { text: "Training", url: "/activeWorkout", icon: <DirectionsRunIcon color="primary" /> },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}
        >
          {/* Collapsed Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
              <NavbarDrawer links={pages} handleClose={handleCloseNavMenu} />
            </Drawer>
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

          {/* User Profile menu */}
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>U</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
