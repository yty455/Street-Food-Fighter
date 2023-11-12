// 깃발조회
import api from '../api';

const WaitingOrdersAPI = async () => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await api.get(`/api/order-server/orders-waiting`, {
      headers: { Authorization: `${accessToken}` },
    });
    console.log('WaitingOrdersAPI', response.data.response);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default WaitingOrdersAPI;
