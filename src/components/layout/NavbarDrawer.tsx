import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import type { PageLink } from "./Navbar";
import { useNavigate } from "react-router-dom";

type Props = {
  links: PageLink[],
  handleClose: () => void
}

export default function NavbarDrawer({ links, handleClose }: Props) {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: 220 }} role="presentation" onClick={handleClose}>
      <List>
        {links.map(page => (
          <ListItem key={page.text} disablePadding>
            <ListItemButton onClick={() => navigate(page.url)}>
              <ListItemIcon>
                {page.icon}
              </ListItemIcon>
              <ListItemText primary={page.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}