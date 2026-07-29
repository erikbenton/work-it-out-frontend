import Card from "@mui/material/Card";
import { useExercises } from "../../../hooks/useExercises";
import type { CompletedExerciseGroup } from "../../../types/completedExerciseGroup";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { Box, CardContent, Grow, List } from "@mui/material";
import ExerciseHistoryItemStats from "../../exercises/components/ExerciseHistoryItemStats";
import { calculateHistory } from "../../../workers/historyWorker";
import { checkPluralization } from "../../../utils/formatters";
import CompletedGroupSet from "./CompletedGroupSet";
import useCompletedWorkoutForm from "../../../hooks/useCompletedWorkoutForm";
import VerticalIconMenu from "../../layout/VerticalIconMenu";

type Props = {
  group: CompletedExerciseGroup
}

export default function CompletedGroupCard({ group }: Props) {
  const { editing, dispatch } = useCompletedWorkoutForm();
  const { services: exerciseServices } = useExercises();
  const exercise = exerciseServices.getExerciseById(group.exerciseId);
  const muscleAvatar = exercise.muscles
    ? exercise.muscles[0].name[0].toUpperCase()
    : "?";
  const muscleColor = exercise.muscles
    ? exercise.muscles[0].colorRgb
    : "red";
  const numberOfSets = group.completedExerciseSets.length;
  const history = calculateHistory(group, exercise.category);

  const handleExerciseClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (editing) {
      e.preventDefault();
    }
  }

  const menuItems = [
    {
      label: "Shift up",
      handleClick: () => {
        dispatch({ type: 'shiftGroup', payload: { group, shift: -1 } });
      },
    },
    {
      label: "Shift down",
      handleClick: () => {
        dispatch({ type: 'shiftGroup', payload: { group, shift: 1 } });
      },
    },
    // {
    //   label: "Replace",
    //   handleClick: () => {
    //     setReplacementKey(exerciseGroup.key);
    //   },
    // },
    {
      label: "Delete",
      handleClick: () => {
        dispatch({ type: 'removeGroup', payload: { group } });
      },
      sx: { color: 'error.main' }
    },
  ];

  return (
    <Card elevation={0} sx={{ width: '100%' }} >
      <CardHeader
        sx={{ overflow: 'hidden', pb: 0 }}
        avatar={
          <Avatar sx={{ bgcolor: muscleColor ?? 'red' }} aria-label="exercise group">
            {muscleAvatar}
          </Avatar>
        }
        action={
          <Grow in={editing}>
            <Box>
              <VerticalIconMenu
                buttonId={(exercise?.name ?? 'exercise').split(' ').join('-').toLowerCase() + "-group-options"}
                menuItems={menuItems}
              />
            </Box>
          </Grow>
        }
        title={
          <Link onClick={handleExerciseClick}
            to={`/exercises/${exercise.id}`}
            className="block min-w-[80%] w-fit"
          >
            {exercise.name}
          </Link>
        }
        subheader={`${numberOfSets} ${checkPluralization('Set', numberOfSets)} completed`}
        slotProps={{ title: { variant: 'h6' } }}
      />
      <CardContent sx={{ p: 0, '&:last-child': { pb: 1 } }}>
        <List>
          {group.completedExerciseSets.map(set => (
            <CompletedGroupSet key={set.id} group={group} set={set} category={exercise.category} />
          ))}
        </List>
        <ExerciseHistoryItemStats history={history} />
      </CardContent>
    </Card>
  );
}