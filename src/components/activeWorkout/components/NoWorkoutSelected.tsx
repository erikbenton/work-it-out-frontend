import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import LoadingIcon from "../../layout/LoadingIcon";

export default function NoWorkoutSelected() {
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
        ? <Typography>No workout selected</Typography>
        : <LoadingIcon />
      }
    </>
  )
}