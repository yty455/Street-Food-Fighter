import kakaomapApi from '@/apis/kakaoAPI';

const handleCurposClick = async (map: any, setAddressName: any) => {
  if (!navigator.geolocation) {
    console.log('브라우저가 위치 정보를 지원하지 않음');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      if (!map) return;

      const newCenter = new kakao.maps.LatLng(latitude, longitude);
      map.setCenter(newCenter);

      const address = await kakaomapApi({ latitude, longitude });
      if (address) {
        setAddressName(address);
        console.log(address);
      }
    },
    () => {
      console.log('현재 위치를 가져올 수 없음');
    },
  );
};
export default handleCurposClick;
