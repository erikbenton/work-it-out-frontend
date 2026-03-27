import { ListItemText, Stack, Typography } from "@mui/material";
import { checkPluralization } from "../../../utils/formatters";
import { getDateTime, type DateTime } from "../../../utils/dateTime";
import type { CompletedExerciseGroup } from "../../../types/completedExerciseGroup";

type Props = {
  group: CompletedExerciseGroup
}

function daysSince(year: number, month: number, day: number): number {
  const pastDate = new Date(year, month - 1, day);
  const now = new Date();
  const diffInMs = now.getTime() - pastDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
}

function formatDate(dateTime: DateTime) {
  const base = `${dateTime.dayOfMonth} ${dateTime.monthNameShort}`;
  const today = new Date();
  return dateTime.year === today.getFullYear()
    ? base
    : base + ` ${dateTime.year}`;
}

export default function ExerciseHistoryItemTitle({ group }: Props) {
  const dateTime = getDateTime(group.createdAt)
  const daysDiff = daysSince(dateTime.year, dateTime.month, dateTime.dayOfMonth);

  return (
    <ListItemText id={`list-label-${group.createdAt}`} className='px-3' primary={
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant='body1' className='grow'>{formatDate(dateTime)}</Typography>
        <Typography variant='body2'>{daysDiff} {checkPluralization('day', daysDiff)} ago</Typography>
      </Stack>
    } />
  );
}