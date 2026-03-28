import { useEffect, useRef, useState } from "react";
import { msToDuration } from "../../../utils/formatters";
import { Typography } from "@mui/material";

type Props = {
  startTime: number
}

export default function ElapsedTimer({ startTime }: Props) {
  const startTimeRef = useRef(startTime);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeElapsed = Date.now() - startTimeRef.current;
      setTime(timeElapsed);
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Typography variant="h5" component="h2">
      {msToDuration(time, { format: "include-hours" })}
    </Typography>
  )
}