import api from '../api';

const GetWishListAPI = async () => {
  // const accessToken = localStorage.getItem('accessToken');
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  try {
    const response = await api.get(`/api/user-server/wishlist`, {
      headers: { Authorization: `${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default GetWishListAPI;
