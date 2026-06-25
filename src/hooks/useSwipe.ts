import { type TouchEvent, useRef } from "react";

interface SwipeInput {
  onSwipedLeft: () => void
  onSwipedRight: () => void
}

interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void
  onTouchMove: (e: TouchEvent) => void
  onTouchEnd: () => void
}

export default (input: SwipeInput): SwipeOutput => {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const touchStartTime = useRef<number | null>(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchEndY.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    touchStartTime.current = Date.now();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current
      || !touchEndX.current
      || !touchStartY.current
      || !touchEndY.current
      || !touchStartTime.current) return;

    // swipe cannot last longer than 1 second
    if (Date.now() - touchStartTime.current > 1000) {
      return;
    }

    const distanceX = touchStartX.current - touchEndX.current;
    const distanceY = Math.abs(touchStartY.current - touchEndY.current);
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;

    // make sure it's a horizontal swipe
    if (isLeftSwipe && distanceX > distanceY) {
      input.onSwipedLeft();
    }
    if (isRightSwipe && Math.abs(distanceX) > distanceY) {
      input.onSwipedRight();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}
