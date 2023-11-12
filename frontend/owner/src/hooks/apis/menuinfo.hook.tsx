import { useState, useEffect } from 'react';
import MenuInfoAPI from '@/apis/menu/MenuInfoAPI';
import { Item } from '@/types/item.type';

const useMenuInfoHook = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchMenuInfo = async () => {
      const fetchedItems = await MenuInfoAPI();
      if (fetchedItems && Array.isArray(fetchedItems)) {
        setItems(fetchedItems as Item[]);
      }
    };

    fetchMenuInfo();
  }, []);

  return items;
};

export default useMenuInfoHook;
