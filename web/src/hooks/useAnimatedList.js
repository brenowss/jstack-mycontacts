import { useCallback, useState } from 'react';

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalitemsIds, setPendingRemovalItemsIds] = useState([]);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prevIds) => [...prevIds, id]);
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setItems((previtems) => previtems.filter((item) => item.id !== id));
    setPendingRemovalItemsIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
  }, []);

  return {
    items,
    setItems,
    pendingRemovalitemsIds,
    handleRemoveItem,
    handleAnimationEnd
  };
}
