import axios from 'axios';

const kakaosearchApi = async (query: any) => {
  try {
    const response = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword?query=${query}`, {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_APP_RESTAPI_KEY}`,
      },
    });

    return response.data.documents;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default kakaosearchApi;
