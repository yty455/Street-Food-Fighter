import api from '../api';

const GetMyPasswordAPI = async () => {
  const accessToken = localStorage.getItem('user-accessToken');

  try {
    const response = await api.get(`/api/user-server/me/payment-password`, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('GetMyPasswordAPI', response.data);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default GetMyPasswordAPI;
