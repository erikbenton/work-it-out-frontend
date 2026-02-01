import { Typography } from "@mui/material";

type Props = {
  message: string
}

export default function ErrorMessage({ message }: Props) {

  return (
    <Typography variant="h4" component="h2" sx={{ flexGrow: 1 }}>
      Error: {message}
    </Typography>
  );
}