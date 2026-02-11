import { Avatar, Card, CardContent, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import type ActiveExerciseGroup from "../../../types/activeExerciseGroup";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from "react";

type Props = {
  exerciseGroup: ActiveExerciseGroup
}

const avatarStyle = {
  width: '35px',
  height: '35px',
  bgcolor: '#E0E7F2',
  color: 'black',
  fontSize: 14
};

export default function ActiveGroupSetsCard({ exerciseGroup }: Props) {

  return (
    <Card sx={{ bgcolor: '#F5FBFF' }}>
      <CardContent className="pb-0" sx={{ p: 0 }}>
        <List sx={{pb:0}}>
          <ListItem>
            <ListItemText primary="Today" slotProps={{primary: { fontWeight: '600' }}} />
          </ListItem>
          <Divider sx={{ opacity: 0.3 }} />
          {exerciseGroup.exerciseSets.map((s, index) => (
            // Wrap these in a Collapse then collapse then when removing
            // remove the set using Collapse's onExited
            <React.Fragment key={s.key}>
              <ListItem
                sx={{ px: 1, py: 1 }}
                key={s.key}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <MoreVertIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{...avatarStyle}}>
                    {index + 1}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Set ${index + 1}`}
                />
              </ListItem>
              <Divider sx={{ opacity: 0.3 }} />
            </React.Fragment>
          ))}
          <ListItem disableGutters sx={{ py: 0 }}>
            <ListItemButton sx={{ px: 1, py: 1 }}>
              <ListItemAvatar>
                <Avatar sx={{...avatarStyle}}>
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