import api from '../api';

const SignUpAPI = async () => {
  try {
    const body = {
      email: 'owner@owner.com',
      password: '1234',
      name: '테스트사장',
      phone: '010-0000-1111',
      bank: '싸피뱅크',
      accountNumber: '123-123-12345-161445',
      fcmToken: '',
      storeName: '미친붕어빵',
      openTime: '10:00',
      closeTime: '18:00',
      businessCategory: '포장마차',
      category: '호떡',
    };
    const response = await api.post(`/api/owner-server/sign-up`, body, {
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
