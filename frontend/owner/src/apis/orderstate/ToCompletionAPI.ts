import api from '../api';

const ToCompletionAPI = async ({ orderId }: any) => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await api.put(
      `/api/order-server/state-completion/${orderId}`,
      {},
      {
        headers: { Authorization: `${accessToken}` },
      },
    );
    // console.log('ToCompletionAPI', response.data.response);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default ToCompletionAPI;
