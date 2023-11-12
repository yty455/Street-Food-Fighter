import api from '../api';

const StatsAPI = async () => {
  // 임시
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  try {
    const response = await api.get(`/api/order-server/orders/stats`, {
      headers: { Authorization: `${accessToken}` },
    });
    console.log('StatsAPI', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default StatsAPI;
