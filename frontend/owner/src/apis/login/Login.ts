import api from '../api';

const LoginAPI = async (data: any) => {
  try {
    const response = await api.post(`/api/owner-server/login`, data, {
      headers: {},
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('로그인 실패');
  }
};

export default LoginAPI;
