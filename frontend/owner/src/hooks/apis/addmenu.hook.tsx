import { useState } from 'react';
import AddMenuAPI from '@/apis/menu/AddMenuAPI';

const useAddMenuHook = () => {
  const addMenu = async (itemData: any) => {
    try {
      const response = await AddMenuAPI(itemData);
      if (response) {
        console.log('Response from AddMenuAPI:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return { addMenu };
};

export default useAddMenuHook;
