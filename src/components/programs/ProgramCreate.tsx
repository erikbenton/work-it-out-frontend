import WorktouProgramFormProvider from "../../contexts/WorkoutProgramFormProvider";
import { useLocation } from "react-router-dom";
import type WorkoutProgram from "../../types/workoutProgram";
import ProgramForm from "./components/ProgramForm";
import programColors from "../../types/programColors";

const newProgram: WorkoutProgram = {
  id: 0,
  name: 'New Program',
  colorRgb: programColors[0],
  workoutIds: []
}

export default function ProgramCreate() {
  const location = useLocation();
  const program: WorkoutProgram = location.state
    ? location.state as WorkoutProgram
    : newProgram;

  return (
    <WorktouProgramFormProvider initProgram={program}>
      <ProgramForm />
    </WorktouProgramFormProvider>
  );
}