import api from '../api';

const ToProcessingAPI = async ({ orderId }: any) => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await api.put(
      `/api/order-server/state-processing/${orderId}`,
      {},
      {
        headers: { Authorization: `${accessToken}` },
      },
    );
    // console.log('ToProcessingAPI', response.data.response);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default ToProcessingAPI;
