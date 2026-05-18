import Box from "@mui/material/Box";
import useProgramForm from "../../../hooks/useProgramForm";
import { Typography } from "@mui/material";
import LoadingIcon from "../../layout/LoadingIcon";


export default function ProgramForm() {
  const { program, saving, editing } = useProgramForm();

  return (
    <>
      {saving &&
        <Box position="fixed" sx={{ zIndex: 99, width: '100%', height: '100%' }}>
          <LoadingIcon />
        </Box>
      }
      <Box
        className="w-full md:w-2/3"
        sx={{ mt: 1, opacity: saving ? 0.5 : undefined }}
        role={editing ? 'form' : 'div'}
      >
        <Typography>{program.name}</Typography>
      </Box>
    </>
  )
}