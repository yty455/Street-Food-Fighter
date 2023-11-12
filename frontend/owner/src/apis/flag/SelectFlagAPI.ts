import api from '../api';

const SelectFlagAPI = async (data: any) => {
  // 임시
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  try {
    const response = await api.post(`/api/store-service/store/business`, data, {
      headers: { Authorization: `${accessToken}` },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export default SelectFlagAPI;
