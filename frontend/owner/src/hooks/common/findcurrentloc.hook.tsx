import kakaomapApi from '@/apis/kakaoAPI';
import kakaoAddressAPI from '@/apis/kakaoAddressAPI';
import { useEffect, useState } from 'react';

const useFindCurrentLoc = (setAddressName: any) => {
  const [position, setPosition] = useState({ lat: 35.08541957184095, lng: 128.87934499308867 });

  const updateLocation = async () => {
    if (!navigator.geolocation) {
      console.log('브라우저가 위치 정보를 지원하지 않음');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (geoPosition) => {
        const { latitude, longitude } = geoPosition.coords;
        const newPosition = { lat: latitude, lng: longitude };
        setPosition(newPosition);

        try {
          const address = await kakaoAddressAPI({ latitude, longitude });
          if (address) setAddressName(address);
        } catch (error) {
          console.error('주소를 불러오는 데 실패했습니다:', error);
        }
      },
      (error) => {
        console.error('현재 위치를 가져올 수 없음:', error);
      },
    );
  };

  useEffect(() => {
    updateLocation();
  }, [setAddressName]);

  return { position, updateLocation };
};

export default useFindCurrentLoc;
