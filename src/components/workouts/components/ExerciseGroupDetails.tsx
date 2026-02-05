import type ExerciseGroup from "../../../types/exerciseGroup";
import ExerciseGroupNoteInput from "./ExerciseGroupNoteInput";
import ExerciseGroupRestTimeInput from "./ExerciseGroupRestTimeInput";

type Props = {
  exerciseGroup: ExerciseGroup,
}


export default function ExerciseGroupCardDetails({ exerciseGroup }: Props) {

  return (
    <>
      <ExerciseGroupNoteInput exerciseGroup={exerciseGroup} />
      <ExerciseGroupRestTimeInput exerciseGroup={exerciseGroup} />
    </>
  );
}