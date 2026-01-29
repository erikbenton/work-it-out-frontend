import { ListItemText, Stack, Typography } from "@mui/material";
import type ExerciseHistory from "../../../types/exerciseHistory";

type Props = {
  group: ExerciseHistory
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

function daysSince(year: number, month: number, day: number): number {
  const pastDate = new Date(year, month - 1, day);
  const now = new Date();
  const diffInMs = now.getTime() - pastDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
}

function formatDate(group: ExerciseHistory) {
  const base = `${group.day} ${months[group.month - 1]}`;
  const today = new Date();
  return group.year === today.getFullYear()
    ? base
    : base + ` ${group.year}`;
}

export default function ExerciseHistoryItemTitle({ group }: Props) {

  return (
    <ListItemText id={`list-label-${group.completedExerciseGroupId}`} className='px-3' primary={
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant='body1' className='grow'>{formatDate(group)}</Typography>
        <Typography variant='body2'>{daysSince(group.year, group.month, group.day)} days ago</Typography>
      </Stack>
    } />
  );
}