import api from '../api';

const BucketAPI = async (data: any) => {
  const accessToken = localStorage.getItem('user-accessToken');

  try {
    const response = await api.post(`/api/order-server/buckets`, data, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('BucketAPI', response);
    return response.data.response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default BucketAPI;
