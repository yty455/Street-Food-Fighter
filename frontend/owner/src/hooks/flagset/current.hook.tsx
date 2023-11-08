import kakaomapApi from '@/apis/kakaoAPI';
import { useEffect, useState } from 'react';
const useCurrentLocation = (setAddressName: any, mapRef: any) => {
  const [position, setPosition] = useState({ lat: 35.08541957184095, lng: 128.87934499308867 });

  const updateLocation = async () => {
    if (!navigator.geolocation) {
      console.log('브라우저가 위치 정보를 지원하지 않음');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const newPosition = { lat: latitude, lng: longitude };
        setPosition(newPosition);

        if (mapRef.current) {
          mapRef.current.setCenter(new kakao.maps.LatLng(latitude, longitude));
        }

        const address = await kakaomapApi({ latitude, longitude });
        if (address) setAddressName(address);
      },
      () => {
        console.log('현재 위치를 가져올 수 없음');
      },
    );
  };

  useEffect(() => {
    updateLocation();
  }, [setAddressName, mapRef]);

  return { position, updateLocation };
};
export default useCurrentLocation;
