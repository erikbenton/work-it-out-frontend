import { useEffect, useRef, useState } from "react";
import { msToDuration } from "../../../utils/formatters";

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
    <span>
      {msToDuration(time, { format: "include-hours" })}
    </span>
  )
}