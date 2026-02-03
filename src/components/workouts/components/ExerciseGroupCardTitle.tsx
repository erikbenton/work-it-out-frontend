import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import { Box, Grow } from "@mui/material";
import type MuscleData from "../../../types/muscleData";

type Props = {
  exerciseName: string,
  muscles: MuscleData[],
  numberOfSets: number,
  isEditing: boolean
}

export default function ExerciseGroupCardTitle({ exerciseName, muscles, numberOfSets, isEditing }: Props) {

  const menuItems = [
    { label: "Shift up", handleClick: () => { }, },
    { label: "Shift down", handleClick: () => { }, },
    { label: "Delete", handleClick: () => { }, sx: { color: 'error.main' } },
  ];

  return (
    <CardHeader
      sx={{ overflow: 'hidden' }}
      avatar={
        <Avatar sx={{ bgcolor: 'red' }} aria-label="exercise group">
          {muscles[0].name[0].toUpperCase()}
        </Avatar>
      }
      action={
        <Grow in={isEditing}>
          <Box>
            <VerticalIconMenu
              buttonId={exerciseName.split(' ').join('-').toLowerCase() + "-group-options"}
              menuItems={menuItems}
            />
          </Box>
        </Grow>
      }
      title={exerciseName}
      subheader={`${numberOfSets} Sets`}
      slotProps={{ title: { variant: 'h6' } }}
      className='pb-0'
    />
  );
}