import api from '../api';

const SignUpAPI = async (data: any) => {
  try {
    console.log(data);
    const response = await api.post(`/api/owner-server/sign-up`, data, {
      headers: {},
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default SignUpAPI;
