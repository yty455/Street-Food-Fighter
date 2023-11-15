import api from '../api';

const GetMyAlertAPI = async (page: any, size: any) => {
  const accessToken = localStorage.getItem('user-accessToken');
  // const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  try {
    const response = await api.get(`/api/noti-server/user/notification?page=${page}&size=${size}`, {
      headers: { Authorization: `${accessToken}` },
    });
    console.log('GetMyAlertAPI = ', response.data);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default GetMyAlertAPI;
