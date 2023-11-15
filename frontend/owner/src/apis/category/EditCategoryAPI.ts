import api from '../api';

const EditCategoryAPI = async ({ data }: any) => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await api.put(`/api/store-service/stores/categories`, data, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('EditCategoryAPI', response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    return null;
  }
};

export default EditCategoryAPI;
