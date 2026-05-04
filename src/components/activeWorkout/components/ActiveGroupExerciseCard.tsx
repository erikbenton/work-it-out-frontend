import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import useActiveWorkout from "../../../hooks/useActiveWorkout";
import { useExercises } from "../../../hooks/useExercises";
import { Link } from "react-router-dom";
import type ActiveExerciseGroup from "../../../types/activeExerciseGroup";
import Stack from "@mui/material/Stack";
import AllSetsCompleteIcon from "./AllSetsCompleteIcon";
import { bgBlue } from "../../../utils/styling";
import CardActions from "@mui/material/CardActions";
import ExpandMoreButton from "../../layout/ExpandMoreButton";
import { useState } from "react";
import { CardContent, Collapse, Typography } from "@mui/material";
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';

type Props = {
  exerciseGroup: ActiveExerciseGroup,
  setReplacingExercise: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ActiveGroupExerciseCard({ exerciseGroup, setReplacingExercise }: Props) {
  const { dispatch } = useActiveWorkout();
  const { services } = useExercises();
  const [isExpanded, setIsExpanded] = useState(false);
  const exercise = services.getExerciseById(exerciseGroup.exerciseId);
  const muscleAvatar = exercise.muscles
    ? exercise.muscles[0].name[0].toUpperCase()
    : "?";
  const muscleColor = exercise.muscles
    ? exercise.muscles[0].colorRgb
    : "red";
  const numberOfSets = exerciseGroup.exerciseSets?.length ?? 0;
  const numberCompleted = exerciseGroup.exerciseSets.filter(s => s.completed).length;

  const menuItems = [
    {
      label: "Replace",
      handleClick: () => {
        setReplacingExercise(true);
      },
    },
    {
      label: "Delete",
      handleClick: () => {
        dispatch({ type: 'removeGroup', payload: { group: exerciseGroup } });
      },
      sx: { color: 'error.main' }
    },
  ];

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <Card sx={{ width: '100%', bgcolor: bgBlue, borderRadius: 5 }}>
      <CardHeader
        sx={{ overflow: 'hidden', pb: exerciseGroup.note ? 0 : undefined }}
        avatar={
          <Avatar sx={{ bgcolor: muscleColor ?? 'red' }} aria-label="exercise group">
            {muscleAvatar}
          </Avatar>
        }
        action={
          <Box>
            <VerticalIconMenu
              buttonId={exercise.name?.split(' ').join('-').toLowerCase() + "-group-options"}
              menuItems={menuItems}
            />
          </Box>
        }
        title={
          <Link to={`/exercises/${exercise.id}`} className="block min-w-[80%] w-fit">
            {exercise.name}
          </Link>
        }
        subheader={
          <Stack spacing={2} direction='row' sx={{ alignItems: 'center', mt: 0.25 }}>
            <Typography component='div'>
              {numberOfSets !== 0 && numberCompleted === numberOfSets
                ? <AllSetsCompleteIcon avatarSx={{ mr: 0.5 }} />
                : `${numberCompleted}/${numberOfSets}`
              } Sets done
            </Typography>
            {exerciseGroup.restTime &&
              <Stack direction='row'>
                <AlarmOutlinedIcon className='mr-1' fontSize="small" />
                <Typography
                  sx={{ flex: 1, textAlign: 'left' }}
                >
                  {exerciseGroup.restTime.slice(exerciseGroup.restTime.search(/[1-9]/))}
                </Typography>
              </Stack>
            }
          </Stack>
        }
        slotProps={{ title: { variant: 'h6' } }}
      />
      {exerciseGroup.note &&
        <>
          <CardActions disableSpacing>
            <ExpandMoreButton
              expand={isExpanded}
              handleExpandClick={handleExpandClick}
              ariaLabel="show exercise group details"
              className='mx-auto '
            />
          </CardActions>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <CardContent sx={{ pt: 1 }}>
              <Typography>{exerciseGroup.note}</Typography>
            </CardContent>
          </Collapse>
        </>
      }
    </Card>
  );
}