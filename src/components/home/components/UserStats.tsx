import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { devConsole } from "../../../utils/debugLogger";
import UserStatsIcons from "./UserStatsIcons";


export default function UserStats() {
  const [period, setPeriod] = useState(28);

  devConsole(period);

  const handleChange = (event: SelectChangeEvent<number>) => {
    setPeriod(event.target.value);
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          width: '100%',
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: 'center',
          px: 1
        }}
      >
        <Typography variant="h6" component="h3">
          Stats
        </Typography>
        <FormControl>
          <InputLabel id="user-stats-period-label">Period</InputLabel>
          <Select
            size="small"
            labelId="user-stats-period-label"
            id="user-stats-period"
            value={period}
            label="Period"
            onChange={handleChange}
            sx={{ borderRadius: 5 }}
            MenuProps={{ slotProps: { paper: { sx: { borderRadius: 5 } } } }}
          >
            <MenuItem value={7}>1 Week</MenuItem>
            <MenuItem value={14}>2 Weeks</MenuItem>
            <MenuItem value={28}>4 Weeks</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Paper
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          py: 2,
          bgcolor: '#F5FBFF',
          borderRadius: 5
        }}
        square={false}
      >
        <UserStatsIcons numberOfDays={period} />
      </Paper >
    </>
  );
}