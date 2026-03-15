import { useCompletedWorkouts } from "../../hooks/useCompletedWorkouts";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import { useMemo } from "react";
import type CompletedWorkout from "../../types/completedWorkout";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import CompletedWorkoutListRow from "./components/CompletedWorkoutListRow";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ListItemButton from "@mui/material/ListItemButton";
import { checkPluralization } from "../../utils/formatters";
import { devConsole } from "../../utils/debugLogger";

export default function CompletedWorkoutList() {
  const { completedWorkouts } = useCompletedWorkouts();
  const navigate = useNavigate();

  const [monthYearWorkoutMap, allKeys] = useMemo(() => {
    const workoutMap = new Map<string, CompletedWorkout[]>();
    const keys: string[] = [];
    devConsole('using memo: month year map')
    completedWorkouts.map(w => {
      const completedDate = new Date(w.createdAt ?? 0);
      const month = completedDate.toLocaleString('en-US', { month: 'long' });
      const year = completedDate.getFullYear();
      const key = `${month}-${year}`;
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
    <Box className="w-full md:w-2/3" sx={{ mt: 1 }}>
      <Typography variant="h4" component="h2">
        History
      </Typography>
      <List
        disablePadding
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
          <li key={`section-${monthYear}`}>
            <ul>
              <ListSubheader disableGutters>
                <Stack direction='row' sx={{ alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {monthYear.split('-')[0]}
                  </Typography>
                  <Typography variant="body2">
                    {monthYearWorkoutMap.get(monthYear)?.length} {checkPluralization('Workout', monthYearWorkoutMap.get(monthYear)?.length)}
                  </Typography>
                </Stack>
              </ListSubheader>
              {monthYearWorkoutMap.get(monthYear)?.map(workout => (
                <ListItem key={`item-${workout.id}`} disableGutters disablePadding>
                  <ListItemButton
                    disableGutters
                    sx={{ p: 0, mb: 1 }}
                    onClick={() => navigate(`/completedWorkouts/${workout.id}`)}>
                    <CompletedWorkoutListRow workout={workout} />
                  </ListItemButton>
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </Box>
  );
}