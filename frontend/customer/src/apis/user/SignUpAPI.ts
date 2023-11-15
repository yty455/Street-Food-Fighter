import api from '../api';

const SignUpAPI = async (data: any) => {
  // const accessToken = localStorage.getItem('accessToken');
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  try {
    const response = await api.post(`/api/user-server/sign-up`, data, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('Signup = ', response);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default SignUpAPI;
