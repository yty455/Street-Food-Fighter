import api from '../api';

const DetailOrderAPI = async ({ orderId }: any) => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await api.get(`/api/order-server/owner/order/${orderId}`, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('DetailOrderAPI', response.data.response);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default DetailOrderAPI;
