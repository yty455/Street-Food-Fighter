import api from '../api';

const GetFundingList = async () => {
  // const accessToken = localStorage.getItem('accessToken');
  // const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const accessToken = localStorage.getItem('user-accessToken');

  try {
    const response = await api.get(`/api/order-server/fundings`, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('Funding', response.data);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default GetFundingList;
