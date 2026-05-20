import Stack from "@mui/material/Stack";
import ProgramNameInput from "./ProgramNameInput";
import IconButton from "@mui/material/IconButton";
import Grow from "@mui/material/Grow";
import useProgramForm from "../../../hooks/useProgramForm";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import VerticalIconMenu from "../../layout/VerticalIconMenu";


export default function ProgramFormTitle() {
  const { editing, handleEditSaveClick, getProgramOptions } = useProgramForm();

  const programOptions = getProgramOptions();

  return (
    <Stack
      direction="row"
      spacing={0}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ProgramNameInput />
      <IconButton color="primary" sx={{ mx: 1 }} onClick={handleEditSaveClick}>
        <Grow in={editing}>
          <CheckIcon fontSize="medium" sx={{ position: 'absolute' }} />
        </Grow>
        <Grow in={!editing}>
          <EditIcon fontSize="medium" sx={{ position: 'absolute' }} />
        </Grow>
      </IconButton>
      <VerticalIconMenu
        buttonId={"program-options"}
        menuItems={programOptions}
        size="medium"
      />
    </Stack>
  )
}