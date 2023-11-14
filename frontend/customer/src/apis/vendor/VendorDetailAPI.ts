import api from '../api';

const VendorDetailAPI = async ({ storeId }: any) => {
  // const accessToken = localStorage.getItem('accessToken');
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  try {
    const response = await api.get(`/api/store-service/stores/${storeId}/detail`, {
      headers: { Authorization: `${accessToken}` },
    });
    console.log('VendorDetailAPI', response.data);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default VendorDetailAPI;