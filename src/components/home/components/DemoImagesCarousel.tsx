import { Box, Slide, IconButton } from "@mui/material";
import { useState, useCallback } from "react";
import useSwipe from "../../../hooks/useSwipe";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type ImageIndex = {
  index: number,
  direction: 'left' | 'right'
}

export default function DemoImagesCarousel() {
  const [containerNode, setContainerNode] = useState<HTMLElement | null>(null);
  const [imageIndex, setImageIndex] = useState<ImageIndex>({ index: 0, direction: 'left' });
  const welcomeImages = [
    'https://res.cloudinary.com/the-lawlz/image/upload/v1783373574/workitout/HomePage.png',
    'https://res.cloudinary.com/the-lawlz/image/upload/v1783373574/workitout/Program.png',
    'https://res.cloudinary.com/the-lawlz/image/upload/v1783373575/workitout/Workout.png',
    'https://res.cloudinary.com/the-lawlz/image/upload/v1783373575/workitout/Training.png',
    'https://res.cloudinary.com/the-lawlz/image/upload/v1783373574/workitout/CompletedWorkout.png',
    'https://res.cloudinary.com/the-lawlz/image/upload/v1783373574/workitout/Exercise.png',
  ]
  const imageShift = (shift: number, direction: 'left' | 'right') => {
    const newIndex = imageIndex.index + shift;
    const index = newIndex < 0
      ? welcomeImages.length + newIndex
      : newIndex % welcomeImages.length;

    setImageIndex({ index, direction })
  }
  const swipeHandlers = useSwipe({
    onSwipedLeft: () => imageShift(1, 'left'),
    onSwipedRight: () => imageShift(-1, 'right')
  });

  const handleContainerRef = useCallback((node: HTMLElement) => {
    setContainerNode(node);
  }, []);

  const oppositeDirection = imageIndex.direction === 'right'
    ? 'left'
    : 'right';

  return (
    <Box {...swipeHandlers} sx={{ position: 'relative' }} ref={handleContainerRef}>
      {welcomeImages.map((image, index) => (
        <Slide
          key={image}
          in={index === imageIndex.index}
          direction={index === imageIndex.index ? imageIndex.direction : oppositeDirection}
          container={containerNode}
        >
          <Box sx={{ position: 'absolute', width: '100%', justifyContent: 'center', display: 'flex', pb: '10vh' }}>
            <img
              src={image}
            />
          </Box>
        </Slide>
      ))}
      <IconButton onClick={() => imageShift(-1, 'right')} sx={{ position: 'absolute', top: '400px', left: '0px' }}>
        <ChevronLeftIcon />
      </IconButton>
      <IconButton onClick={() => imageShift(1, 'left')} sx={{ position: 'absolute', top: '400px', right: '0px' }}>
        <ChevronRightIcon />
      </IconButton>
    </Box>
  )
}