import Box from "@mui/material/Box";
import LoadingIcon from "../../layout/LoadingIcon";
import useCompletedWorkoutForm from "../../../hooks/useCompletedWorkoutForm";
import CompletedWorkoutInfo from "./CompletedWorkoutInfo";

export default function CompletedWorkoutForm() {
  const { saving } = useCompletedWorkoutForm();

  return (
    <>
      {saving &&
        <Box position="fixed" sx={{ zIndex: 99, width: '100%', height: '100%' }}>
          <LoadingIcon />
        </Box>
      }
      <Box
        className="w-full md:w-2/3 border-x border-blue-100"
        sx={{
          mt: 1,
          minHeight: `calc(100dvh - 64px - 8px)`,
          opacity: saving ? 0.5 : undefined
        }}
      >
        <CompletedWorkoutInfo />
        <Box sx={{ height: '10vh', minHeight: '10vh' }}></Box>
      </Box>
    </>
  );
}