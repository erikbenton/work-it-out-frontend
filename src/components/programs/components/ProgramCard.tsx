import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Link } from "react-router-dom";
import type WorkoutProgram from "../../../types/workoutProgram";
import { bgBlue } from "../../../utils/styling";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import { useWorkouts } from "../../../hooks/useWorkouts";
import { usePrograms } from "../../../hooks/usePrograms";

type Props = {
  program: WorkoutProgram
}

export default function ProgramCard({ program }: Props) {
  const { services: workoutServices } = useWorkouts();
  const { services: programServices } = usePrograms();
  const workouts = program.workoutIds.map(p => workoutServices.getWorkoutById(p));
  const workoutNames = workouts.map(w => w.name).join(', ');

  const menuItems = [
    {
      label: "Clone",
      handleClick: () => { },
    },
    {
      label: "Delete",
      handleClick: () => {
        if (!program.id) return;
        programServices.remove(program.id);
      },
      sx: { color: 'error.main' }
    },
  ];

  return (
    <Card sx={{ bgcolor: bgBlue, borderRadius: 5 }}>
      <CardHeader
        avatar={
          <Link to={`/programs/${program.id}`}>
            <Avatar aria-label="workout" sx={{ bgcolor: program.colorRgb }}>
              {program.name[0].toUpperCase()}
            </Avatar>
          </Link>
        }
        title={
          <Link to={`/programs/${program.id}`} className="inline-block w-full">
            {program.name}
          </Link>
        }
        subheader={
          <Link to={`/programs/${program.id}`} className="inline-block w-full">
            {program.description ?? workoutNames}
          </Link>
        }
        action={
          <VerticalIconMenu
            buttonId={program.name.split(' ').join('-').toLowerCase() + "-options"}
            menuItems={menuItems}
          />
        }
        slotProps={{ title: { variant: 'h6' } }}
      />
    </Card>
  );
}