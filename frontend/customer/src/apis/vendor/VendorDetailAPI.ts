import api from '../api';

const VendorDetailAPI = async ({ storeId }: any) => {
  const accessToken = localStorage.getItem('user-accessToken');

  try {
    const response = await api.get(`/api/store-service/stores/${storeId}/detail`, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('VendorDetailAPI', response.data);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default VendorDetailAPI;
