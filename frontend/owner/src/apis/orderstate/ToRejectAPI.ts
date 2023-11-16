import api from '../api';

const ToRejectAPI = async ({ orderId }: any) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await api.put(
      `/api/payment-server/orders/${orderId}/reject`,
      {},
      {
        headers: { Authorization: `${accessToken}` },
      },
    );
    // console.log('ToRejectAPI', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default ToRejectAPI;
