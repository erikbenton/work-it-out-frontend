import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useUser from "../../hooks/useUser";

export default function UserErrorList() {
  const { userMessages } = useUser();

  return (
    <List dense disablePadding>
      {userMessages.map((message, i) => (
        <ListItem
          disablePadding
          disableGutters
          key={i}
        >
          <ListItemText>{message}</ListItemText>
        </ListItem>
      ))}
    </List>
  )
}