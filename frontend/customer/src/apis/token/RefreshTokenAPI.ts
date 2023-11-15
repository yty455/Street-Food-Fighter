import api from '../api';

const GetTokenAPI = async () => {
  try {
    const refreshTokenJson = localStorage.getItem('user-refreshToken');
    const response = await api.get(`/api/user-server/jwt?refresh-token=${refreshTokenJson}`, {});
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('정보 가져오기 실패');
  }
};

export default GetTokenAPI;
