import { Avatar, Card, CardContent, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import type ActiveExerciseGroup from "../../../types/activeExerciseGroup";
import React from "react";
import { ActiveGroupSet, CompletedActiveSet, CurrentActiveSet } from "./ActiveGroupSetItems";

type Props = {
  exerciseGroup: ActiveExerciseGroup
}

export default function ActiveGroupSetsCard({ exerciseGroup }: Props) {
  const currentSet = exerciseGroup.exerciseSets.findIndex(s => !s.completed);

  return (
    <Card sx={{ bgcolor: '#F5FBFF' }}>
      <CardContent className="pb-0" sx={{ p: 0 }}>
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
                ? <CompletedActiveSet index={index} set={s} />
                : index === currentSet
                  ? <CurrentActiveSet index={index} set={s} />
                  : <ActiveGroupSet index={index} set={s} />
              }
              <Divider sx={{ opacity: 0.3 }} />
            </React.Fragment>
          ))}
          <ListItem disableGutters sx={{ py: 0 }}>
            <ListItemButton sx={{ px: 1, py: 1 }}>
              <ListItemAvatar>
                <Avatar sx={{
                  width: '35px',
                  height: '35px',
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