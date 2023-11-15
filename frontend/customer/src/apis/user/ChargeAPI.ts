import api from '../api';

const ChargeAPI = async ({ data }: any) => {
  // const accessToken = localStorage.getItem('accessToken');
  // const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const accessToken = localStorage.getItem('user-accessToken');

  try {
    const response = await api.put(`/api/user-server/points`, data, {
      headers: { Authorization: `${accessToken}` },
    });
    console.log('ChargeAPI = ', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default ChargeAPI;
