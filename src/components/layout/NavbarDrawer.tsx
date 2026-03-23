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
      <DrawerUserMenu />
      <Divider sx={{ pt: 1, mx: 1 }} />
      <List onClick={handleClose}>
        {pages.map(page => (
          <ListItem
            key={page.text}
            disablePadding
            sx={{
              bgcolor: page.active ? 'primary.main' : 'inherited',
              color: page.active ? 'white' : 'inherited',
              borderBottomRightRadius: '20px',
              borderTopRightRadius: '20px',
              width: '95%'
            }}
          >
            <ListItemButton
              onClick={() => navigate(page.url)}
              sx={{
                borderBottomRightRadius: '20px',
                borderTopRightRadius: '20px',
                width: '95%'
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