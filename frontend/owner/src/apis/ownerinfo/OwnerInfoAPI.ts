import api from '../api';

const OwnerInfoAPI = async (token: string) => {
  try {
    const response = await api.get(`/api/owner-server/me`, {
      headers: { authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('정보 가져오기 실패');
  }
};

export default OwnerInfoAPI;
