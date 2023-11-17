import api from '../api';

const DeleteWishListAPI = async (categoryName: string) => {
  const accessToken = localStorage.getItem('user-accessToken');

  const body = { foodType: categoryName };
  try {
    const response = await api.post(`/api/user-server/wishlist/remove`, body, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('UserInfo = ', response.data);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default DeleteWishListAPI;
