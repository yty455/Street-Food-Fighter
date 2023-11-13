import api from '../api';

const WishlistAPI = async ({ addressname }: any) => {
  const accessToken = localStorage.getItem('accessToken');
  const [region1, region2, region3, region4 = ''] = addressname.split(' ');

  try {
    const response = await api.get(
      `/api/user-server/stats?region1=${region1}&region2=${region2}&region3=${region3}&region4=${region4}
    `,
      {
        headers: { Authorization: `${accessToken}` },
      },
    );
    // console.log('WishlistAPI', response.data);
    return response.data.response;
  } catch (error) {
    z;
    console.error(error);
    return null;
  }
};

export default WishlistAPI;
