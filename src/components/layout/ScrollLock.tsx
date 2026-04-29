import { useEffect } from "react";

export default function ScrollLock() {
  useEffect(() => {
    // Get the current window overflow value
    const originalStyle: string = window.getComputedStyle(
      document.body
    ).overflow;

    // Disable scrolling on the document body on mount
    document.body.style.overflow = 'hidden';

    // Return a cleanup function to enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = originalStyle || '';
    };
  }, []);

  return null;
};