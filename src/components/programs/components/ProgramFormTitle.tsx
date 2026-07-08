import Stack from "@mui/material/Stack";
import ProgramNameInput from "./ProgramNameInput";
import IconButton from "@mui/material/IconButton";
import useProgramForm from "../../../hooks/useProgramForm";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import Collapse from "@mui/material/Collapse";


export default function ProgramFormTitle() {
  const { editing, handleSaveClick, handleEditClick, handleCancelClick, getProgramOptions } = useProgramForm();

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
      <Collapse in={editing} orientation="horizontal">
        <Stack direction='row' spacing={2} sx={{ alignItems: 'center', ml: 1 }}>
          <IconButton color="primary" onClick={handleSaveClick}>
            <CheckIcon fontSize="medium" sx={{ position: 'absolute' }} />
          </IconButton>
          <IconButton color="error" onClick={handleCancelClick}>
            <CloseIcon fontSize="medium" sx={{ position: 'absolute' }} />
          </IconButton>
        </Stack>
      </Collapse>
      <Collapse in={!editing} orientation="horizontal">
        <IconButton color="primary" sx={{ mx: 1 }} onClick={handleEditClick}>
          <EditIcon fontSize="medium" sx={{ position: 'absolute' }} />
        </IconButton>
      </Collapse>
      <VerticalIconMenu
        buttonId={"program-options"}
        menuItems={programOptions}
        size="medium"
      />
    </Stack>
  )
}