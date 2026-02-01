import { Box, Grow, IconButton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type Workout from "../../types/Workout";
import LoadingMessage from "../layout/LoadingMessage";
import { getWorkoutById } from "../../requests/workouts";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import ExerciseGroupCard from "./components/ExerciseGroupCard";
import VerticalIconMenu from "../layout/VerticalIconMenu";
import { useState } from "react";

export default function WorkoutDetails() {
  const [editing, setEditing] = useState(false);
  const id = Number(useParams().id)
  const { data: workout, isLoading } = useQuery<Workout>({
    queryKey: ['workout'],
    queryFn: () => getWorkoutById(id)
  });

  const menuItems = [
    { label: editing ? "Save" : "Edit", handleClick: () => { setEditing(!editing) }, },
    { label: "Delete", handleClick: () => { }, sx: { color: 'error.main' } },
  ];

  if (isLoading) {
    return (<LoadingMessage dataName='workouts' />);
  }

  return (
    <Box className="w-full md:w-2/3 px-3">
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
        <Grow in={editing}>
          <IconButton color="primary">
            <AddCircleOutlinedIcon fontSize="large" />
          </IconButton>
        </Grow>
      </Stack>
      <Stack spacing={1} className="pb-3" >
        {workout?.exerciseGroups.map(group => (
          <ExerciseGroupCard key={group.id} exerciseGroup={group} isEditing={editing} />
        ))}
      </Stack>
    </Box>
  )
}