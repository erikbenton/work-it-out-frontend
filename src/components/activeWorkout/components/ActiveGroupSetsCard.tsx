import { Avatar, Card, CardContent, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import type ActiveExerciseGroup from "../../../types/activeExerciseGroup";
import React from "react";
import { ActiveGroupSet, CompletedActiveSet, CurrentActiveSet } from "./ActiveGroupSetItems";
import useActiveWorkout from "../../../hooks/useActiveWorkout";
import type ActiveExerciseSet from "../../../types/activeExerciseSet";
import type { CompletedExerciseSet } from "../../../types/completedExerciseSet";

type Props = {
  exerciseGroup: ActiveExerciseGroup,
  onDoubleClick: (completedSet: CompletedExerciseSet | ActiveExerciseSet) => void,
}

export default function ActiveGroupSetsCard({ exerciseGroup, onDoubleClick }: Props) {
  const { dispatch, setEditing } = useActiveWorkout();
  const currentSet = exerciseGroup.exerciseSets.findIndex(s => !s.completed);

  const handleAddSet = () => {
    dispatch({
      type: 'addGroupSet',
      payload: { group: exerciseGroup }
    });
    setEditing(true);
  }

  return (
    <Card sx={{ bgcolor: '#F5FBFF', borderRadius: 5 }}>
      <CardContent className="pb-1" sx={{ p: 0 }}>
        <List sx={{ pb: 0 }}>
          <ListItem>
            <ListItemText primary="Today" slotProps={{ primary: { fontWeight: '600' } }} />
          </ListItem>
          <Divider sx={{ opacity: 0.3 }} />
          {exerciseGroup.exerciseSets.map((s, index) => (
            // Wrap these in a Collapse then collapse then when removing
            // remove the set using Collapse's onExited
            <React.Fragment key={s.key}>
              {s.completed
                ? <CompletedActiveSet index={index} set={s} exerciseGroup={exerciseGroup} onDoubleClick={onDoubleClick} />
                : index === currentSet
                  ? <CurrentActiveSet index={index} set={s} exerciseGroup={exerciseGroup} />
                  : <ActiveGroupSet index={index} set={s} exerciseGroup={exerciseGroup} />
              }
              <Divider sx={{ opacity: 0.3 }} />
            </React.Fragment>
          ))}
          <ListItem disableGutters sx={{ py: 0 }}>
            <ListItemButton sx={{ px: 1, py: 1 }} onClick={handleAddSet}>
              <ListItemAvatar>
                <Avatar sx={{
                  width: '30px',
                  height: '30px',
                  bgcolor: '#E0E7F2',
                  color: 'black',
                  fontSize: 14
                }}>
                  +
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Add set</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}