import api from '../api';

const UserInfotAPI = async () => {
  const accessToken = localStorage.getItem('user-accessToken');

  try {
    const response = await api.get(`/api/user-server/me`, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('UserInfo = ', response.data);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default UserInfotAPI;
