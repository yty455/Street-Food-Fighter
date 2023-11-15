import api from '../api';

const LoginAPI = async (data: any) => {
  // const accessToken = localStorage.getItem('accessToken');
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  try {
    const response = await api.post(`/api/user-server/login`, data, {
      headers: { Authorization: `${accessToken}` },
    });
    console.log('Login = ', response);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default LoginAPI;
