import {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalitemsIds, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId);
    removeListener();

    animationEndListeners.current.delete(itemId);
    animatedRefs.current.delete(itemId);

    setItems((previtems) => previtems.filter((item) => item.id !== itemId));
    setPendingRemovalItemsIds((prevIds) => prevIds.filter((prevId) => prevId !== itemId));
  }, []);

  useEffect(() => {
    pendingRemovalitemsIds.forEach((id) => {
      const containerRef = animatedRefs.current.get(id);
      const alreadyHasListener = animationEndListeners.current.has(id);

      const containerElement = containerRef?.current;

      if (containerElement && !alreadyHasListener) {
        const onAnimationEnd = () => handleAnimationEnd(id);
        const removeListener = () => {
          containerElement.removeEventListener('animationend', onAnimationEnd);
          animationEndListeners.current.delete(id);
        };

        animationEndListeners.current.set(id, onAnimationEnd);
        containerElement.addEventListener('animationend', removeListener);
      }
    });
  }, [pendingRemovalitemsIds]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;

    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prevIds) => [...prevIds, id]);
  }, []);

  const getAnimatedRef = useCallback((id) => {
    let containerRef = animatedRefs.current.get(id);

    if (!containerRef) {
      containerRef = createRef();
      animatedRefs.current.set(id, containerRef);
    }

    return containerRef;
  }, []);

  const renderList = useCallback((callback) => (
    items.map((item) => {
      const isLeaving = pendingRemovalitemsIds.includes(item.id);
      const containerRef = getAnimatedRef(item.id);

      return callback(item, {
        isLeaving,
        containerRef
      });
    })
  ), [items, pendingRemovalitemsIds, getAnimatedRef]);

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList
  };
}
