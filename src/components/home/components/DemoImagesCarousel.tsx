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
    'https://res.cloudinary.com/the-lawlz/image/upload/v1783438537/workitout/HomePage-portrait.png',
    'https://res.cloudinary.com/the-lawlz/image/upload/v1783438537/workitout/Program-portrait.png',
    'https://res.cloudinary.com/the-lawlz/image/upload/v1783438537/workitout/Workout-portrait.png',
    'https://res.cloudinary.com/the-lawlz/image/upload/v1783438537/workitout/Training-portrait.png',
    'https://res.cloudinary.com/the-lawlz/image/upload/v1783438537/workitout/CompletedWorkout-portrait.png',
    'https://res.cloudinary.com/the-lawlz/image/upload/v1783438537/workitout/Exercise-portrait.png',
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
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              marginInline: 'auto',
              width: 'fit-content',
              maxWidth: { xs: '300px', lg: '350px' },
              pb: '10vh',
            }}
          >
            <img
              src={image}
            />
          </Box>
        </Slide>
      ))}
      <IconButton
        onClick={() => imageShift(-1, 'right')}
        sx={{
          position: 'absolute',
          top: { xs: '300px', lg: '350px' },
          left: { xs: 0, sm: '10%', md: 0 },
        }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        onClick={() => imageShift(1, 'left')}
        sx={{
          position: 'absolute',
          top: { xs: '300px', lg: '350px' },
          right: { xs: 0, sm: '10%', md: 0 }
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  )
}