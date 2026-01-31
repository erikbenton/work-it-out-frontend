import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import VerticalIconMenu from "../../layout/VerticalIconMenu";

type Props = {
  exerciseName: string,
  bodyPart: string,
  numberOfSets: number
}

export default function ExerciseGroupCardTitle({ exerciseName, bodyPart, numberOfSets }: Props) {

  const menuItems = [
    { label: "Shift up", handleClick: () => { }, },
    { label: "Shift down", handleClick: () => { }, },
    { label: "Delete", handleClick: () => { }, sx: { color: 'error.main' } },
  ];

  return (
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'red' }} aria-label="exercise group">
          {bodyPart[0].toUpperCase()}
        </Avatar>
      }
      action={
        <VerticalIconMenu
          buttonId={exerciseName.split(' ').join('-').toLowerCase() + "-group-options"}
          menuItems={menuItems}
        />
      }
      title={exerciseName}
      subheader={`${numberOfSets} Sets`}
      slotProps={{ title: { variant: 'h6' } }}
      className='pb-0'
    />
  );
}