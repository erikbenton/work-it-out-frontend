import Stack from "@mui/material/Stack";
import { getErrorMessage, type FallbackProps } from "react-error-boundary";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { devConsole } from "../../utils/debugLogger";
import { useState } from "react";
import LoadingIcon from "./LoadingIcon";

export default function ErrorMessage({ error, resetErrorBoundary }: FallbackProps) {
  const [loading, setLoading] = useState(false);

  devConsole(error);

  const handleClick = (reload: boolean) => {
    setLoading(true);
    resetErrorBoundary(reload ? 'reload' : undefined);
  }

  // not quite there yet for loading icon
  // since the loading state doesn't update
  if (loading) {
    return (<LoadingIcon />);
  }

  return (
    <Stack spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
      <Typography variant="h4" component="h2" sx={{ flexGrow: 1 }}>
        {getErrorMessage(error)}
      </Typography>
      <Button sx={{ width: '90%', borderRadius: 5 }} onClick={() => handleClick(false)}>Home</Button>
      <Button sx={{ width: '90%', borderRadius: 5 }} onClick={() => handleClick(true)} color="error">Reload</Button>
    </Stack>
  );
}