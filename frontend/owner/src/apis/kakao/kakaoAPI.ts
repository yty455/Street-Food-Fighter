import axios from 'axios';

const kakaomapApi = async ({ latitude, longitude }: any) => {
  //   console.log('중심 좌표:', latitude, longitude);

  try {
    const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`, {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_APP_RESTAPI_KEY}`,
      },
    });
    const location = response.data.documents[0];
    return location.address_name;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default kakaomapApi;
