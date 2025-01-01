import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount(open) {
  const [shouldRender, setShouldRender] = useState(open);

  const componentRef = useRef(null);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      if (!open) {
        setShouldRender(false);
      }
    }

    const componentRefElement = componentRef.current;
    if (!open && componentRefElement) {
      componentRefElement.addEventListener('animationend', () => {
        setShouldRender(false);
      });
    }

    return () => {
      if (componentRefElement) {
        componentRefElement.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [open]);

  return { shouldRender, componentRef };
}
