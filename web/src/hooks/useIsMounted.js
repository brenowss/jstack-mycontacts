import { useEffect, useRef, useCallback } from 'react';

export default function useIsMounted() {
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = false;
  }, []);

  const getIsMounted = useCallback(() => isMounted.current, []);

  return getIsMounted;
}
