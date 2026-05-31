import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import LoadingIcon from "./LoadingIcon";

export type NoItemProps = {
  label?: string
}

export default function NoItemSelected({ label }: NoItemProps) {
  const [waitIsOver, setWaitIsOver] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWaitIsOver(true);
    }, 3_500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {waitIsOver
        ? (label !== undefined) && <Typography>{label}</Typography>
        : <LoadingIcon />
      }
    </>
  )
}