import { useEffect, useState } from 'react';

export default function useKeyboardDetection() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (!window.visualViewport) return;

    const handler = () => {
      const viewport = window.visualViewport;
      if (!viewport) return;
      // If the visual viewport is significantly smaller than the screen
      // or the app's height, the keyboard is likely present.
      const isOpened = viewport.height < window.innerHeight - 100;
      setIsKeyboardOpen(isOpened);
      setKeyboardHeight(window.innerHeight - viewport.height);
    };

    window.visualViewport.addEventListener('resize', handler);
    window.visualViewport.addEventListener('scroll', handler);

    return () => {
      window.visualViewport?.removeEventListener('resize', handler);
      window.visualViewport?.removeEventListener('scroll', handler);
    };
  }, []);

  return { isKeyboardOpen, keyboardHeight };
}