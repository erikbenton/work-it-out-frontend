import { Typography } from "@mui/material";

type Props = {
  dataName: string
}

export default function LoadingMessage({ dataName }: Props) {

  return (
    <Typography variant="h4" component="h2" sx={{ flexGrow: 1 }}>
      Loading {dataName}...
    </Typography>
  );
}