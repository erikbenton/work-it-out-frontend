import { useParams } from "react-router-dom"
import { usePrograms } from "../../hooks/usePrograms";
import ProgramForm from "./components/ProgramForm";
import WorkoutProgramFormProvider from "../../contexts/WorkoutProgramFormProvider";

export function ProgramDetails() {
  const id = Number(useParams().id);
  const { services } = usePrograms();
  const program = services.getProgramById(id);

  return (
    <WorkoutProgramFormProvider initProgram={program}>
      <ProgramForm />
    </WorkoutProgramFormProvider>
  )
}