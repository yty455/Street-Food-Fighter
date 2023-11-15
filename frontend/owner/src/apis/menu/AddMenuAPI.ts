import api from '../api';

const AddMenuAPI = async (data: any) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await api.post(`/api/store-service/menus`, data, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return null;
  }
};

export default AddMenuAPI;
