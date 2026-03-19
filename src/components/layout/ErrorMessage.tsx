import Stack from "@mui/material/Stack";
import { getErrorMessage, type FallbackProps } from "react-error-boundary";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ErrorMessage({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Stack spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
      <Typography variant="h4" component="h2" sx={{ flexGrow: 1 }}>
        {getErrorMessage(error)}
      </Typography>
      <Button sx={{ width: '90%', borderRadius: 5 }} onClick={resetErrorBoundary}>Home</Button>
    </Stack>
  );
}