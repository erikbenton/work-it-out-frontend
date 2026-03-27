import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import type { PageLink } from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import DrawerUserMenu from "./DrawerUserMenu";
import { Suspense } from "react";
import LoadingIcon from "./LoadingIcon";

type Props = {
  links: PageLink[],
  handleClose: () => void
}

export default function NavbarDrawer({ links, handleClose }: Props) {
  const pages: PageLink[] = links.map(l => ({ ...l, active: false }));
  const location = useLocation();
  const navigate = useNavigate();

  let matches = 0;
  for (const page of pages) {
    if (location.pathname.includes(page.url)) {
      page.active = true;
      matches++;
    }
  }

  // Unmark the home page if multiple matches
  if (matches > 1) {
    pages[0].active = false;
  }

  return (
    <Box sx={{ width: 220, height: '100%', bgcolor: 'white' }} role="presentation">
      <Suspense fallback={<LoadingIcon />}>
        <DrawerUserMenu />
      </Suspense>
      <Divider sx={{ pt: 1, mx: 1 }} />
      <List onClick={handleClose}>
        {pages.map(page => (
          <ListItem
            key={page.text}
            disablePadding
            sx={{
              bgcolor: page.active ? 'primary.light' : 'inherited',
              color: page.active ? 'white' : 'inherited',
              borderBottomRightRadius: '25px',
              borderTopRightRadius: '25px',
              width: '97%'
            }}
          >
            <ListItemButton
              onClick={() => navigate(page.url)}
              sx={{
                borderBottomRightRadius: '25px',
                borderTopRightRadius: '25px',
                width: '97%'
              }}
            >
              <ListItemIcon>
                {page.icon(page.active)}
              </ListItemIcon>
              <ListItemText primary={page.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}