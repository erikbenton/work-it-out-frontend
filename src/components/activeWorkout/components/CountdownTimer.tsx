import { useEffect, useRef, useState } from "react";
import { durationToSeconds, msToDuration } from "../../../utils/formatters";
import { Collapse, Typography } from "@mui/material";
import useActiveWorkout from "../../../hooks/useActiveWorkout";

type Props = {
  startTime: number,
  duration: string
}

export default function CountdownTimer({ startTime, duration }: Props) {
  const { timerAppeared, setTimerAppeared } = useActiveWorkout();
  const durationInMs = durationToSeconds(duration) * 1000;
  const startTimeRef = useRef(startTime);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeElapsed = Date.now() - startTimeRef.current;
      setTime(timeElapsed);
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  const handleAppeared = () => {
    setTimerAppeared(true);
  }

  // Make sure the count down time is rounding up to the sec
  // eg: 59,999 msec -> 59.999 -> 60 sec, not 59 sec
  //     59,001 msec -> 59.001 -> 60 sec, not 59 sec
  const countDownTimeActual = Math.ceil((durationInMs - time) / 1000) * 1000;
  const countDownTime = Math.abs(countDownTimeActual);

  return (
    <Collapse orientation="horizontal" in={true} appear={!timerAppeared} onTransitionEnd={handleAppeared}>
      <Typography>
        {msToDuration(countDownTime, { format: "include-hours" })}
      </Typography>
    </Collapse>
  )
}