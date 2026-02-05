import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import useWorkoutForm from "../../../hooks/useWorkoutForm";
import WorkoutFormNameInput from "./WorkoutFormNameInput";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';

export default function WorkoutFormTitle() {
  const { workout, editing, setEditing } = useWorkoutForm();

  const menuItems = [
    { label: editing ? "Cancel" : "Edit", handleClick: () => { setEditing(!editing) }, },
    { label: "Delete", handleClick: () => { }, sx: { color: 'error.main' } },
  ];

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
        <WorkoutFormNameInput />
        <IconButton color="primary" sx={{mx: 1}} onClick={() => setEditing(!editing)}>
          <Grow in={editing}>
            <CheckIcon fontSize="medium" sx={{position: 'absolute'}} />
          </Grow>
          <Grow in={!editing}>
            <EditIcon fontSize="medium" sx={{position: 'absolute'}} />
          </Grow>
        </IconButton>
        <VerticalIconMenu
          buttonId={"workout-options"}
          menuItems={menuItems}
          size="large"
        />
      </Stack >
      <Stack
        direction="row"
        spacing={2}
        className="px-2"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          // paddingX: '8px'
        }}
      >
        <Typography variant="body1" component="span">
          {workout?.exerciseGroups.length} Exercises
        </Typography>
        <Grow in={editing} >
          <IconButton color="primary">
            <AddCircleOutlinedIcon fontSize="large" />
          </IconButton>
        </Grow>
      </Stack>
    </>
  );
}