import api from '../api';

const VendorReviewAPI = async ({ storeId }: any) => {
  // const accessToken = localStorage.getItem('accessToken');
  // const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const accessToken = localStorage.getItem('user-accessToken');

  try {
    const response = await api.get(`/api/store-service/store/${storeId}/review?page=0&size=5`, {
      headers: { Authorization: `${accessToken}` },
    });
    console.log('VendorReviewAPI', response.data);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default VendorReviewAPI;
