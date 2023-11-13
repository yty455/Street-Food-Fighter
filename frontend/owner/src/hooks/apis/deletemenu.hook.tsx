import DeleteMenuAPI from '@/apis/menu/DeleteMenuAPI';

const useDeleteMenuHook = () => {
  const deleteMenu = async (menuId: any) => {
    try {
      const response = await DeleteMenuAPI({ menuId });
      // console.log('Menu deleted:', response);
      return response;
    } catch (error) {
      console.error('Error deleting menu:', error);
      return null;
    }
  };

  return { deleteMenu };
};

export default useDeleteMenuHook;
