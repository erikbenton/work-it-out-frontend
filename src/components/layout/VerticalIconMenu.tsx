import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import type { SxProps, Theme } from "@mui/material/styles";
import { useState } from "react";
import type { OverridableStringUnion,  } from "@mui/types";
import type { SvgIconPropsSizeOverrides } from "@mui/material";

type MenuItemProps = {
  label: string,
  handleClick: () => void,
  sx?: SxProps<Theme>,
}

type Props = {
  menuItems: MenuItemProps[],
  buttonId: string,
  sx?: SxProps<Theme>,
  size?: OverridableStringUnion<'inherit' | 'large' | 'medium' | 'small', SvgIconPropsSizeOverrides>,
  edge?: false | "start" | "end"
}

export default function VerticalIconMenu({ menuItems, buttonId, size, sx, edge }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClick = (menuItem: MenuItemProps) => {
    return () => {
      menuItem.handleClick();
      handleClose();
    };
  }

  return (
    <>
      <IconButton
        id={buttonId}
        onClick={handleClick}
        sx={sx}
        aria-controls={open ? 'options-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        edge={edge}
      >
        <MoreVertIcon fontSize={size ?? 'inherit'} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': buttonId,
          },
        }}
      >
        {menuItems.map(item => (
          <MenuItem
            key={item.label}
            sx={item.sx}
            onClick={onClick(item)}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}