import api from '../api';

const GetOrderDetailAPI = async () => {
  // const accessToken = localStorage.getItem('accessToken');
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  try {
    const response = await api.get(`/api/order-server/orders`, {
      headers: { Authorization: `${accessToken}` },
    });
    console.log('OrderListAPI', response.data);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default GetOrderDetailAPI;
