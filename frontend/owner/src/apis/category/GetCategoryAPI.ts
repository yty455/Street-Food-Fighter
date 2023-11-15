import api from '../api';

const GetCategoryAPI = async () => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await api.get(`/api/store-service/stores/categories`, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('GetCategoryAPI', response.data);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default GetCategoryAPI;
