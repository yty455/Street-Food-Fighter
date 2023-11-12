// 깃발조회
import api from '../api';

const AllOrdersAPI = async () => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await api.get(`/api/order-server/owner/orders`, {
      headers: { Authorization: `${accessToken}` },
    });
    console.log('CompleteOrdersAPI', response.data.response);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default AllOrdersAPI;
