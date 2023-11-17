import api from '../api';

const GetFundingDetail = async (number: any) => {
  const accessToken = localStorage.getItem('user-accessToken');

  try {
    const response = await api.get(`/api/order-server/fundings/${number}`, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('FundingDetail', response.data);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default GetFundingDetail;
