import { Avatar, Card, CardContent, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import type ActiveExerciseGroup from "../../../types/activeExerciseGroup";
import MoreVertIcon from '@mui/icons-material/MoreVert';

type Props = {
  exerciseGroup: ActiveExerciseGroup
}
export default function ActiveGroupSetsCard({ exerciseGroup }: Props) {

  return (
    <Card>
      <CardContent sx={{p: 0, pb: 0}}>
        <List disablePadding>
          <ListItem>Today</ListItem>
          {exerciseGroup.exerciseSets.map((s, index) => (
            // Wrap these in a Collapse then collapse then when removing
            // remove the set using Collapse's onExited
            <ListItem
              key={s.key}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <MoreVertIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  {index + 1}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Set ${index + 1}`}
              />
            </ListItem>
          ))}
          <ListItem>
            <ListItemButton sx={{px:0}}>
              <ListItemAvatar>
                <Avatar>
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