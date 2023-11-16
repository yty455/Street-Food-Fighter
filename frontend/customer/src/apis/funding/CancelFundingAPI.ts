import api from '../api';

const CancelFundingAPI = async (fundingId: any) => {
  // const accessToken = localStorage.getItem('accessToken');
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  try {
    const response = await api.post(
      `api/payment-server/fundings/${fundingId}/cancel`,
      {},
      {
        headers: { Authorization: `${accessToken}` },
      },
    );
    // console.log('Cancel = ', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default CancelFundingAPI;
