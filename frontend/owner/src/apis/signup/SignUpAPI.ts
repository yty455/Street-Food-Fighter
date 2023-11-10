import api from '../api';

const SignUpAPI = async (data: any) => {
  try {
    const response = await api.post(`/api/owner-server/sign-up`, data, {
      headers: {},
    });
    console.log('===결과===');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default SignUpAPI;
