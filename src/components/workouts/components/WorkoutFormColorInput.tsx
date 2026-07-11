import Stack from "@mui/material/Stack";
import { Avatar, Collapse, FormControl, FormControlLabel, Paper, Radio, RadioGroup, TextField } from "@mui/material";
import programColors from "../../../types/programColors";
import { bgBlue } from "../../../utils/styling";
import ExpandMoreButton from "../../layout/ExpandMoreButton";
import { useState } from "react";
import useWorkoutForm from "../../../hooks/useWorkoutForm";
import { devConsole } from "../../../utils/debugLogger";

export default function WorkoutFormColorInput() {
  const { editing, workout, dispatch } = useWorkoutForm();
  const [expandColors, setExpandColors] = useState(false);

  const handleColorChange = (_event: React.ChangeEvent<HTMLInputElement, Element>, colorRgb: string) => {
    devConsole(colorRgb);
    dispatch({ type: 'setColor', payload: { colorRgb } });
  }

  const handleExpandColorsClick = () => {
    setExpandColors(!expandColors);
  }

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      dispatch({ type: 'setTag', payload: { tag: undefined } });
    } else {
      const tag = event.target.value;
      if (tag.length < 4) {
        dispatch({ type: 'setTag', payload: { tag } });
      }
    }
  }

  return (
    <Collapse in={editing}>
      <Paper
        sx={{
          mx: 1, mt: 1, py: 1.5,
          display: 'flex', flexDirection: 'row',
          bgcolor: bgBlue, borderRadius: 5
        }}
        square={false}
      >
        <FormControl sx={{ mx: 2, width: '100%' }}>
          <Stack direction='row' alignItems='center'>
            <Stack direction='row' spacing={2} alignItems='center' sx={{ ml: 1 }}>
              <TextField
                onChange={handleTagChange}
                value={workout.tag ?? ''}
                label='Tag'
                sx={{ maxWidth: '75px' }}
              />
              <Avatar
                sx={{
                  alignContent: 'center',
                  bgcolor: workout.colorRgb ?? programColors[0],
                  fontSize: (workout.tag?.length ?? 0) > 2 ? '1.125rem' : undefined
                }}
              >
                {(workout.tag ?? ' ')}
              </Avatar>
            </Stack>
            <ExpandMoreButton
              expand={expandColors}
              handleExpandClick={handleExpandColorsClick}
              ariaLabel="colors-expand-button"
            />
          </Stack>
          <Collapse in={expandColors}>
            <RadioGroup
              row
              aria-labelledby="workout-color-group-label"
              name="workout-color-group"
              value={workout.colorRgb ?? programColors[0]}
              onChange={handleColorChange}
              sx={{ flexWrap: 'wrap', mb: 2, justifyContent: 'space-evenly', width: '100%' }}
            >
              {programColors.map(color => (
                <FormControlLabel
                  key={color}
                  value={color}
                  control={<Radio />}
                  label={
                    <Avatar sx={{ bgcolor: color, width: 24, height: 24 }}> </Avatar>
                  }
                />
              ))}
            </RadioGroup>
          </Collapse>
        </FormControl>
      </Paper>
    </Collapse>
  )
}