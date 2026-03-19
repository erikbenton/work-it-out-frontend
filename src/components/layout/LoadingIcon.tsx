import { Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  label?: string
}

export default function LoadingIcon({ label }: Props) {
  return (
    <Stack direction='column' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 3 }}>
      {label && <Typography variant="h4">{label}</Typography>}
      <CircularProgress sx={{ mt: 3 }} />
    </Stack>
  );
}