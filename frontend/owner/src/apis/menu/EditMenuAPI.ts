import api from '../api';

const EditMenuAPI = async ({ menuId, data }: any) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await api.put(`/api/store-service/menus/${menuId}`, data, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('EditMenu', response.data);
    return response.data;
  } catch (error) {
    // console.log(error);
    return null;
  }
};

export default EditMenuAPI;
