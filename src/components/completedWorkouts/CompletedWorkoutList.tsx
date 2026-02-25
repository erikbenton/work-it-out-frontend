import { useCompletedWorkouts } from "../../hooks/useCompletedWorkouts";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useMemo } from "react";
import type CompletedWorkout from "../../types/completedWorkout";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";

type MonthYearKey = {
  month: string,
  year: number
}

export default function CompletedWorkoutList() {
  const { completedWorkouts } = useCompletedWorkouts();

  const [monthYearWorkoutMap, allKeys] = useMemo(() => {
    const workoutMap = new Map<MonthYearKey, CompletedWorkout[]>();
    const keys: MonthYearKey[] = [];
    console.log('using memo: month year map')
    completedWorkouts.map(w => {
      const completedDate = new Date(w.createdAt ?? 0);
      const month = completedDate.toLocaleString('en-US', { month: 'long' });
      const year = completedDate.getFullYear();
      const key = { month, year };
      if (workoutMap.get(key)) {
        const currentEntries = workoutMap.get(key) ?? [];
        workoutMap.set(key, currentEntries.concat(w));
      } else {
        workoutMap.set(key, [w]);
        keys.push(key);
      }
    });

    return [workoutMap, keys];
  }, [completedWorkouts]);

  return (
    <Box className="w-full md:w-2/3 px-3" sx={{ mt: 1 }}>
      <Typography variant="h4" component="h2">
        History
      </Typography>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: '87vh',
          '& ul': { padding: 0 },
          mt: 1
        }}
        subheader={<li />}
      >
        {allKeys.map(monthYear => (
          <li key={`section-${monthYear.month}-${monthYear.year}`}>
            <ul>
              <ListSubheader>
                <Stack direction='row' sx={{ alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {monthYear.month}
                  </Typography>
                  <Typography variant="body2">
                    {monthYearWorkoutMap.get(monthYear)?.length} Workouts
                  </Typography>
                </Stack>
              </ListSubheader>
              {monthYearWorkoutMap.get(monthYear)?.map(workout => (
                <ListItem key={`item-${workout.id}`}>
                  <ListItemText primary={workout.name} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </Box>
  );
}