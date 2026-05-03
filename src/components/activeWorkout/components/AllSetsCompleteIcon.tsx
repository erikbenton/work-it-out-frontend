import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import DoneIcon from '@mui/icons-material/Done';
import type { SxProps, Theme } from "@mui/material/styles";

type Props = {
  avatarSx?: SxProps<Theme>
}

export default function AllSetsCompleteIcon({ avatarSx }: Props) {

  return (
    <Box sx={{ display: 'inline-block' }}>
      <Avatar sx={{ bgcolor: green[700], width: '0.75rem', height: '0.75rem', p: '8px', ...avatarSx }} >
        <DoneIcon sx={{ width: '0.75rem', height: '0.75rem' }} />
      </Avatar>
    </Box>
  );
}