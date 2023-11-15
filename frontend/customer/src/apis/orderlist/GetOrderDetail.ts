import api from '../api';

const GetOrderDetailAPI = async (orderId: any) => {
  // const accessToken = localStorage.getItem('accessToken');
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  try {
    const response = await api.get(`/api/order-server/orders/${orderId}`, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('OrderDetail : ', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default GetOrderDetailAPI;
