import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import type Workout from "../../../types/workout";

type Props = {
  workout: Workout,
  editing: boolean,
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export default function WorkoutDetailsTitle({ workout, editing, setEditing }: Props) {

  const menuItems = [
    { label: editing ? "Save" : "Edit", handleClick: () => { setEditing(!editing) }, },
    { label: "Delete", handleClick: () => { }, sx: { color: 'error.main' } },
  ];

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h2">
          {workout?.name}
        </Typography>
        <VerticalIconMenu
          buttonId={"workout-options"}
          menuItems={menuItems}
          size="large"
        />
      </Stack>
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