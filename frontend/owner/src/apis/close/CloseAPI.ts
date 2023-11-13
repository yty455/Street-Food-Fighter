import api from '../api';

const CloseAPI = async () => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await api.delete(`/api/store-service/store/business`, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default CloseAPI;
