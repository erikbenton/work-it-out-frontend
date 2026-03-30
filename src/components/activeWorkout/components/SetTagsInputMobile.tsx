import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useSetTags from "../../../hooks/useSetTags";
import type ActiveExerciseSet from "../../../types/activeExerciseSet";
import type SetTagOption from "../../../types/setTagOption";
import ToggleButton from "@mui/material/ToggleButton";
import Chip from "@mui/material/Chip";

type Props = {
  expanded: boolean,
  values?: ActiveExerciseSet,
  setValues: React.Dispatch<React.SetStateAction<ActiveExerciseSet | undefined>>,
}

export default function SetTagsInputMobile({ expanded, values, setValues }: Props) {
  const { setTags } = useSetTags();

  const handleSetTypeChange = (_event: React.MouseEvent<HTMLElement>, setTag: SetTagOption | null) => {
    if (!values) return;
    const newSet = { ...values, setTagId: setTag?.id };
    setValues(newSet);
  }

  return (
    <Stack sx={{ justifyContent: 'space-evenly', mt: 0 }}>
      <Collapse in={expanded} unmountOnExit>
        <ToggleButtonGroup
          id="set-tag-group-label"
          value={setTags?.find(st => st.id === values?.setTagId)}
          exclusive
          onChange={handleSetTypeChange}
          aria-label="Tag"
          sx={{ flexWrap: 'wrap', mx: 2, mb: 2, justifyContent: 'space-evenly' }}
        >
          {setTags?.map(option => (
            <ToggleButton
              key={option.id}
              className="rounded-full"
              value={option}
              size="small"
              sx={{ border: 'none', p: 0, mr: 1, mt: 1 }}
            >
              <Chip
                label={option.name}
                variant="outlined"
                size="medium"
                className="capitalize"
                sx={{ border: `1px solid ${option.colorRgb}`, minWidth: '80px' }}
              />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Collapse>
    </Stack>
  );
}