import api from '../api';

const SignUpAPI = async (data: any) => {
  try {
    const response = await api.post(`/api/user-server/sign-up`, data, {
      headers: {},
    });
    // console.log('Signup = ', response);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default SignUpAPI;
