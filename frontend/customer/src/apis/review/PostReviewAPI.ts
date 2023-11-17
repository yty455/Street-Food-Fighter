import api from '../api';

const PostReviewAPI = async (data: any) => {
  const accessToken = localStorage.getItem('user-accessToken');

  try {
    const response = await api.post(`/api/store-service/review`, data, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('UserInfo = ', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default PostReviewAPI;
