import { Curpos, Filter, Research, Position, StyledTop, Topbar, CardList } from './Main.styled';
import Card from '@/components/main/card';
import FilterComponent from '@/components/main/filter';
import { useEffect, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import handleCurposClick from '@/hooks/currentHook';
import handleRefreshClick from '@/hooks/refreshHook';
import kakaomapApi from '@/apis/kakaoAPI';

const MainPage = () => {
  const [addressName, setAddressName] = useState('');
  const mapRef = useRef<kakao.maps.Map>(null);

  // filter
  const [isFilterVisible, setFilterVisible] = useState(false);
  const toggleFilter = () => setFilterVisible(!isFilterVisible);

  const [position, setPosition] = useState({ lat: 35.08541957184095, lng: 128.87934499308867 });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setPosition({ lat: latitude, lng: longitude });
        const address = await kakaomapApi({ latitude, longitude });
        if (address) setAddressName(address);
      },
      (error) => {
        console.error('Error getting current position:', error);
      },
    );
  }, []);

  return (
    <div style={{ height: '93vh' }}>
      <Map center={position} style={{ width: '100%', height: '100%' }} ref={mapRef}></Map>
      <StyledTop>
        <Topbar>
          <Filter onClick={toggleFilter}>
            <img src="/images/top/filter.png" style={{ width: '35px' }} />
          </Filter>

          <Position>{addressName}</Position>
        </Topbar>
        <Research onClick={() => handleRefreshClick(mapRef, setAddressName)}>현 지도에서 검색</Research>
      </StyledTop>
      {isFilterVisible && <FilterComponent onClose={toggleFilter} />}

      <Curpos onClick={() => handleCurposClick(mapRef.current, setAddressName)}>
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
