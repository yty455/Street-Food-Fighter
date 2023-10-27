import kakaomapApi from '@/apis/kakaoAPI';

const useSetPlaceHook = (mapRef: any, setAddressName: any, setPositionVisible: any) => {
  const setPlace = async (x: any, y: any) => {
    const latitude = Number(y);
    const longitude = Number(x);
    const coords = new kakao.maps.LatLng(latitude, longitude);
    mapRef.current?.setCenter(coords);

    const address = await kakaomapApi({ latitude, longitude });
    if (address) setAddressName(address);

    setPositionVisible(false);
  };

  return setPlace;
};

export default useSetPlaceHook;
