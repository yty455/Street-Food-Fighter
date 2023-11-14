import api from '../api';

const DetailFlagAPI = async (flagId: any) => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await api.get(`/api/store-service/store/flags/${flagId}`, {
      headers: { Authorization: `${accessToken}` },
    });
    console.log('DetailFlagAPI', response.data);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default DetailFlagAPI;
