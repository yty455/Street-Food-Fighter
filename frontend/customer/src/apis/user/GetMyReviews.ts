import api from '../api';

const GetMyReviewsAPI = async (page: any, size: any) => {
  const accessToken = localStorage.getItem('user-accessToken');

  try {
    const response = await api.get(`/api/store-service/review?page=${page}&size=${size}`, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('review = ', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default GetMyReviewsAPI;
