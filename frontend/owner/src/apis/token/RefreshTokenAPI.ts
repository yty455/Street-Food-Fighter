import api from '../api';

const GetTokenAPI = async (token: string) => {
  try {
    const response = await api.get(`/api/owner-server/jwt?refresh-token=${token}`, {});
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('정보 가져오기 실패');
  }
};

export default GetTokenAPI;
