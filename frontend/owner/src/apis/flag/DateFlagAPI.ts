// 깃발조회
import api from '../api';

const DateFlagAPI = async (date: any) => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await api.get(`/api/store-service/store/flags?date=${date}`, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('DateFlagAPI', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default DateFlagAPI;
