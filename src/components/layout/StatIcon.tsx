import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

type Props = {
  icon: ReactNode,
  color: string,
  text: string | number,
  label: string
}

export default function StatIcon({ icon, color, text, label }: Props) {

  return (
    <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
      <Avatar sx={{ bgcolor: color }}>
        {icon}
      </Avatar>
      <Typography variant="body1">
        {text}
      </Typography>
      <Typography variant="body2" sx={{ color: 'gray' }} textAlign='center'>{label}</Typography>
    </Stack>
  )
}