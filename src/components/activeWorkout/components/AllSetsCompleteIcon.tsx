import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import DoneIcon from '@mui/icons-material/Done';

export default function AllSetsCompleteIcon() {

  return (
    <Box sx={{ display: 'inline-block' }}>
      <Avatar sx={{ bgcolor: green[700], width: '0.75rem', height: '0.75rem', p: '8px', ml: 1 }} >
        <DoneIcon sx={{ width: '0.75rem', height: '0.75rem' }} />
      </Avatar>
    </Box>
  );
}