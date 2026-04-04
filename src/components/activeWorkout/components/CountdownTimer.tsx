import { useEffect, useRef, useState } from "react";
import { durationToSeconds, msToDuration } from "../../../utils/formatters";
import { Chip, Collapse, Menu, MenuItem, Typography, type SxProps } from "@mui/material";
import useActiveWorkout from "../../../hooks/useActiveWorkout";
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import type { VerticalMenuItemProps } from "../../layout/VerticalIconMenu";
import type { Theme } from "@emotion/react";
import { red } from "@mui/material/colors";

type Props = {
  startTime: number,
  duration: string,
  chipSx?: SxProps<Theme>
}

export default function CountdownTimer({ startTime, duration, chipSx }: Props) {
  const { timerAppeared, setTimerAppeared, dispatch, timerOffset, setTimerOffset } = useActiveWorkout();
  const durationInMs = durationToSeconds(duration) * 1000;
  const startTimeRef = useRef(startTime);
  const [time, setTime] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeElapsed = Date.now() - startTimeRef.current - timerOffset;
      setTime(timeElapsed);
    }, 50);

    return () => clearInterval(intervalId);
  }, [timerOffset]);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClick = (menuItem: VerticalMenuItemProps) => {
    return () => {
      menuItem.handleClick();
      handleClose();
    };
  }

  const handleAppeared = () => {
    setTimerAppeared(true);
  }

  const menuItems: VerticalMenuItemProps[] = [
    {
      label: "+30 sec",
      handleClick: () => {
        const thirtySeconds = 30 * 1000;
        setTimerOffset(curr => curr + thirtySeconds);
      },
    },
    {
      label: "-30 sec",
      handleClick: () => {
        const thirtySeconds = 30 * 1000;
        setTimerOffset(curr => curr - thirtySeconds);
      },
    },
    {
      label: "Stop",
      handleClick: () => {
        dispatch({
          type: 'updateRestTime',
          payload: { startTime: undefined, duration: undefined }
        });
        setTimerOffset(0);
      },
      sx: { color: 'error.main' }
    }
  ]

  // Make sure the count down time is rounding up to the sec
  // eg: 59,999 msec -> 59.999 -> 60 sec, not 59 sec
  //     59,001 msec -> 59.001 -> 60 sec, not 59 sec
  const countDownTimeActual = Math.ceil((durationInMs - time) / 1000) * 1000;
  const countDownTime = Math.abs(countDownTimeActual);

  return (
    <>
      <Chip
        variant="outlined"
        onClick={handleClick}
        sx={{ ...chipSx, py: 1, borderColor: countDownTimeActual < 0 ? red[300] : 'inherit' }}
        label={
          <Collapse
            orientation="horizontal"
            in={true}
            appear={!timerAppeared}
            onTransitionEnd={handleAppeared}>
            <Typography>
              <AccessAlarmOutlinedIcon sx={{ pr: '4px' }} />
              {msToDuration(countDownTime, { format: "include-hours" })}
            </Typography>
          </Collapse>
        }
      />
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'workout-timer'
          },
          paper: {
            sx: { borderRadius: 5 }
          }
        }}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {menuItems.map(item => (
          <MenuItem
            key={item.label}
            sx={item.sx}
            onClick={onClick(item)}
            disabled={item.disabled ?? false}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}