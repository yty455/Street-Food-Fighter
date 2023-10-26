import kakaomapApi from '@/apis/kakaoAPI';
import { Curpos, Filter, Research, Position, StyledTop, Topbar, CardList } from './Main.styled';
import Card from '@/components/main/card';
import FilterComponent from '@/components/main/filter';
import { useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

const MainPage = () => {
  const [addressName, setAddressName] = useState('부산시 강서구 녹산동');
  // 중심좌표

  const mapRef = useRef<kakao.maps.Map>(null);
  const handleResearchClick = async () => {
    const map = mapRef.current;
    if (!map) return;

    const center = map.getCenter();
    const latitude = center.getLat();
    const longitude = center.getLng();

    // console.log('중심 좌표:', center.getLat(), center.getLng());
    const address = await kakaomapApi({ latitude, longitude });
    if (address) setAddressName(address);
  };

  // filter
  const [isFilterVisible, setFilterVisible] = useState(false);
  const toggleFilter = () => setFilterVisible(!isFilterVisible);

  // 현위치
  const handleCurposClick = async () => {
    if (!navigator.geolocation) {
      console.log('브라우저가 위치 정보를 지원하지 않음');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const map = mapRef.current;
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

  return (
    <div style={{ height: '93vh' }}>
      <Map center={{ lat: 35.08541957184095, lng: 128.87934499308867 }} style={{ width: '100%', height: '100%' }} ref={mapRef}></Map>
      <StyledTop>
        <Topbar>
          <Filter onClick={toggleFilter}>
            <img src="/images/top/filter.png" style={{ width: '35px' }} />
          </Filter>

          <Position>{addressName}</Position>
        </Topbar>
        <Research onClick={handleResearchClick}>현 지도에서 검색</Research>
      </StyledTop>
      {isFilterVisible && <FilterComponent onClose={toggleFilter} />}

      <Curpos onClick={handleCurposClick}>
        <img src="/images/orderfunding/curpos.png" style={{ width: '40px' }} />
      </Curpos>
      <CardList>
        <div />
        <Card />
        <Card />
        <div />
      </CardList>
    </div>
  );
};

export default MainPage;
