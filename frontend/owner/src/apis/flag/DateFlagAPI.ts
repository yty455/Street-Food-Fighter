// 깃발조회
import api from '../api';

const DateFlagAPI = async (date: any) => {
  // 임시
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

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
