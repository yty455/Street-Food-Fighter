import api from '../api';
import { categories as allCategories } from '@/assets/category';

const NearVendorsAPI = async ({ addressname, categories }: any) => {
  // const accessToken = localStorage.getItem('accessToken');
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const [region1, region2, region3, region4 = ''] = addressname.split(' ');
  const categoriesToUse = categories.length > 0 ? categories : allCategories.map((cat) => cat.type);
  const categoriesQueryString = categoriesToUse.map((cat: any) => `categories=${encodeURIComponent(cat)}`).join('&');
  const url = `/api/store-service/stores/near?region1=${encodeURIComponent(region1)}&region2=${encodeURIComponent(
    region2,
  )}&region3=${encodeURIComponent(region3)}&region4=${encodeURIComponent(region4)}&${categoriesQueryString}`;

  try {
    const response = await api.get(url, {
      headers: { Authorization: `${accessToken}` },
    });
    // console.log('NearflagAPI', response);
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default NearVendorsAPI;
