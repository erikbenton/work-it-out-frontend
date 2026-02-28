import Card from "@mui/material/Card";
import { useExercises } from "../../../hooks/useExercises";
import type { CompletedExerciseGroup } from "../../../types/completedExerciseGroup";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { CardContent, List } from "@mui/material";
import ExerciseHistoryItemSet from "../../exercises/components/ExerciseHistoryItemSet";
import ExerciseHistoryItemStats from "../../exercises/components/ExerciseHistoryItemStats";

type Props = {
  group: CompletedExerciseGroup
}

export default function CompletedGroupCard({ group }: Props) {
  const { services: exerciseService } = useExercises();
  const exercise = exerciseService.getExerciseById(group.exerciseId);
  const muscleAvatar = exercise.muscles
    ? exercise.muscles[0].name[0].toUpperCase()
    : "?";
  const numberOfSets = group.completedExerciseSets.length;

  return (
    <Card elevation={0} sx={{ width: '100%' }} >
      <CardHeader
        sx={{ overflow: 'hidden', pb: 0 }}
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="exercise group">
            {muscleAvatar}
          </Avatar>
        }
        title={
          <Link to={`/exercises/${exercise.id}`} className="block min-w-[80%] w-fit">
            {exercise.name}
          </Link>
        }
        subheader={`${numberOfSets} Sets completed`}
        slotProps={{ title: { variant: 'h6' } }}
      />
      <CardContent sx={{ p: 0, '&:last-child': { pb: 1 } }}>
        <List>
          {group.completedExerciseSets.map(set => (
            <ExerciseHistoryItemSet key={set.id} set={set} />
          ))}
        </List>
        <ExerciseHistoryItemStats id={group.id} completedSets={group.completedExerciseSets} />
      </CardContent>
    </Card>
  );
}