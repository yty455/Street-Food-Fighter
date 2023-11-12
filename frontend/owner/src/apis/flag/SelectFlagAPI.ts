import api from '../api';

const SelectFlagAPI = async (data: any) => {
  // 임시
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  console.log('data', data);
  try {
    console.log(data);
    const response = await api.post(`/api/store-service/store/business`, data, {
      headers: { Authorization: `${accessToken}` },
    });
    console.log('SelectFlagAPI', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default SelectFlagAPI;
