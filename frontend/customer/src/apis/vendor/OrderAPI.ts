import api from '../api';

const OrderAPI = async (data: any) => {
  //   const accessToken = localStorage.getItem('accessToken');
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  // console.log('data', data);
  try {
    const response = await api.post(`/api/payment-server/orders`, data, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('OrderAPI', response.data.response);
    return response.data.response;
  } catch (error) {
    return null;
  }
};

export default OrderAPI;
