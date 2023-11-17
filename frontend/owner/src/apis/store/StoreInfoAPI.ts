import api from '../api';

const StoreInfoAPI = async (token: string) => {
  try {
    const response = await api.get(`/api/store-service/store`, {
      headers: { authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('정보 가져오기 실패');
  }
};

export default StoreInfoAPI;
