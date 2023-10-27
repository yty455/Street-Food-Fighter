import kakaomapApi from '@/apis/kakaoAPI';

const handleRefreshClick = async (mapRef: any, setAddressName: any) => {
  const map = mapRef.current;
  if (!map) return;

  const center = map.getCenter();
  const latitude = center.getLat();
  const longitude = center.getLng();

  const address = await kakaomapApi({ latitude, longitude });
  if (address) setAddressName(address);
};

export default handleRefreshClick;
