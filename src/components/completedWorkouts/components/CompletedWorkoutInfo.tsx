import Stack from "@mui/material/Stack"
import CompletedWorkoutStats from "./CompletedWorkoutStats"
import CompletedGroupCard from "./CompletedGroupCard"
import MuscleSummaryChart from "./MuscleSummaryChart"
import useCompletedWorkoutForm from "../../../hooks/useCompletedWorkoutForm"
import CompletedFormTitle from "./CompletedFormTitle"

export default function CompletedWorkoutInfo() {
  const { workout } = useCompletedWorkoutForm()

  return (
    <>
      <CompletedFormTitle />
      <CompletedWorkoutStats workout={workout!} />
      <Stack spacing={0}>
        {workout.completedExerciseGroups.map(group => (
          <CompletedGroupCard key={group.id} group={group} />
        ))}
      </Stack>
      <MuscleSummaryChart groups={workout.completedExerciseGroups} />
    </>
  )
}