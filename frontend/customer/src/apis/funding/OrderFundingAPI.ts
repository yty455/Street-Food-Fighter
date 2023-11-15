import api from '../api';

const OrderFundingAPI = async (fundingId: any) => {
  // const accessToken = localStorage.getItem('accessToken');
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  try {
    const response = await api.post(
      `/api/payment-server/orders/funding/${fundingId}`,
      {},
      {
        headers: { Authorization: `${accessToken}` },
      },
    );
    // console.log('OrderFundingAPI = ', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default OrderFundingAPI;
