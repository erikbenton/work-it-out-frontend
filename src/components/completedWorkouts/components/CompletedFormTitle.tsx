import Stack from "@mui/material/Stack";
import useCompletedWorkoutForm from "../../../hooks/useCompletedWorkoutForm";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CompletedFormNameInput from "./CompletedFormNameInput";

export default function CompletedFormTitle() {
  const {
    editing,
    handleSaveClick,
    handleEditClick,
    handleCancelClick,
    menuItems
  } = useCompletedWorkoutForm();

  return (
    <>
      <Stack
        direction="row"
        spacing={0}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CompletedFormNameInput />
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
          buttonId={"workout-options"}
          menuItems={menuItems}
          size="medium"
        />
      </Stack >
    </>
  );
}