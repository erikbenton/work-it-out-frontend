import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useProgramForm from "../../../hooks/useProgramForm";
import { Avatar, Collapse, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup } from "@mui/material";
import programColors from "../../../types/programColors";
import { bgBlue } from "../../../utils/styling";
import ExpandMoreButton from "../../layout/ExpandMoreButton";
import { useState } from "react";

export default function ProgramFormColorInput() {
  const { editing, program, dispatch } = useProgramForm();
  const [expandColors, setExpandColors] = useState(false);

  const handleColorChange = (_event: React.ChangeEvent<HTMLInputElement, Element>, colorRgb: string) => {
    dispatch({ type: 'setColor', payload: { colorRgb } });
  }

  const handleExpandColorsClick = () => {
    setExpandColors(!expandColors);
  }

  return (
    <Collapse in={editing}>
      <Paper
        sx={{
          mx: 1, mt: 1, py: 1,
          display: 'flex', flexDirection: 'row',
          bgcolor: bgBlue, borderRadius: 5
        }}
        square={false}
      >
        <FormControl sx={{ mx: 2, width: '100%' }}>
          <Stack direction='row' alignItems='center'>
            <Stack direction='row'>
              <FormLabel id="program-color-group-label">
                <Typography sx={{ display: 'inline-block', mr: 1 }}>
                  Color
                </Typography>
              </FormLabel>
              <Avatar sx={{ display: 'inline-block', bgcolor: program.colorRgb, width: 20, height: 20 }}> </Avatar>
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
              aria-labelledby="program-color-group-label"
              name="program-color-group"
              value={program.colorRgb ?? programColors[0]}
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