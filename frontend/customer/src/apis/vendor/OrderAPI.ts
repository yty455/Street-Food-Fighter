import api from '../api';

const OrderAPI = async (data: any) => {
  const accessToken = localStorage.getItem('user-accessToken');

  // console.log('data', data);
  try {
    const response = await api.post(`/api/payment-server/orders`, data, {
      headers: { Authorization: `${accessToken}` },
    });

    // console.log('OrderAPI', response);
    return response.data;
  } catch (error) {
    return null;
  }
};

export default OrderAPI;
