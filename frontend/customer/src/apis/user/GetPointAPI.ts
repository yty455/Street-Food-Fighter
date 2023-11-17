import api from '../api';

const GetPointAPI = async () => {
  const accessToken = localStorage.getItem('user-accessToken');

  try {
    const response = await api.get(`/api/user-server/me/points`, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('GetPointAPI', response.data);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default GetPointAPI;
