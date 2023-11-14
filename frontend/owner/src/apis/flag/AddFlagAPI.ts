import api from '../api';

const AddFlagAPI = async (data: any) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await api.post(`/api/store-service/flags`, data, {
      headers: { Authorization: `${accessToken}` },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return null;
  }
};

export default AddFlagAPI;
