import EditMenuAPI from '@/apis/menu/EditMenuAPI';

const useEditMenuHook = () => {
  const editMenu = async (menuId: any, itemData: any) => {
    try {
      const response = await EditMenuAPI({ menuId, data: itemData });
      return response;
    } catch (error) {
      console.error('Error editing menu:', error);
      return null;
    }
  };

  return { editMenu };
};

export default useEditMenuHook;
