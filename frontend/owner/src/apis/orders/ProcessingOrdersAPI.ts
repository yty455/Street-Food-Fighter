// 깃발조회
import api from '../api';

const ProcessingOrdersAPI = async () => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await api.get(`/api/order-server/orders-processing`, {
      headers: { Authorization: `${accessToken}` },
    });
    console.log('ProcessingOrdersAPI', response.data.response);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default ProcessingOrdersAPI;
