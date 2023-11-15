import api from '../api';

const PostWishListAPI = async (categoryName: string) => {
  // const accessToken = localStorage.getItem('accessToken');
  // const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const accessToken = localStorage.getItem('user-accessToken');

  const body = { foodType: categoryName };
  try {
    const response = await api.post(`/api/user-server/wishlist/add`, body, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('UserInfo = ', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default PostWishListAPI;
