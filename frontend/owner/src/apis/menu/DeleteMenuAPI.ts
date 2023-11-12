import api from '../api';

const DeleteMenuAPI = async ({ menuId }: any) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await api.delete(`/api/store-service/menus/${menuId}`, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('EditMenu', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default DeleteMenuAPI;
