import { useParams } from "react-router-dom"
import { usePrograms } from "../../hooks/usePrograms";
import ProgramForm from "./components/ProgramForm";
import WorkoutProgramFormProvider from "../../contexts/WorkoutProgramFormProvider";
import NoItemSelected from "../layout/NoItemSelected";

export function ProgramDetails() {
  const id = Number(useParams().id);
  const { services } = usePrograms();
  const program = services.getProgramByIdUnsafe(id);

  if (!program) {
    return (<NoItemSelected label="No Program selected." />)
  }

  return (
    <WorkoutProgramFormProvider initProgram={program}>
      <ProgramForm />
    </WorkoutProgramFormProvider>
  )
}