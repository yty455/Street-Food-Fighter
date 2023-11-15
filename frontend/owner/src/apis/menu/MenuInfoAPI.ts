// 상품 조회
import api from '../api';

const MenuInfoAPI = async () => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await api.get(`/api/store-service/menus`, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('MenuInfoAPI', response.data);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default MenuInfoAPI;
