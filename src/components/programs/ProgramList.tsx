import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { usePrograms } from "../../hooks/usePrograms";
import Stack from "@mui/material/Stack";
import ProgramCard from "./components/ProgramCard";

export default function ProgramsList() {
  const { programs } = usePrograms();

  return (
    <Box className="w-full md:w-2/3" sx={{ mt: 1, px: 1, pb: '10vh' }}>
      <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
        Programs
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Button
          fullWidth
          aria-label="start workout"
          sx={{ textTransform: "none", borderRadius: 5 }}
          variant="contained"
          onClick={() => { }}
        >
          Add Program
        </Button>
      </Box>
      <Stack spacing={1}>
        {programs.map(p => (
          <ProgramCard key={p.id} program={p} />
        ))}
      </Stack>
    </Box>
  )
}