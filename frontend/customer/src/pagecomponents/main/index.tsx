import { Curpos, Filter, Research, Position, StyledTop, Topbar, CardList } from './Main.styled';
import Card from '@/components/main/card';
import FilterComponent from '@/components/common/filter';
import { useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import handleRefreshClick from '@/hooks/refreshHook';
import useCurrentLocation from '@/hooks/currentHook';
import SearchPlace from '@/components/common/searchplace';
import kakaomapApi from '@/apis/kakaoAPI';

const MainPage = () => {
  const [addressName, setAddressName] = useState('');
  const mapRef = useRef<kakao.maps.Map>(null);

  // filter
  const [isFilterVisible, setFilterVisible] = useState(false);
  const toggleFilter = () => setFilterVisible(!isFilterVisible);

  // position
  const [isPositionVisible, setPositionVisible] = useState(false);
  const togglePosition = () => setPositionVisible(!isPositionVisible);
  const { position, updateLocation } = useCurrentLocation(setAddressName, mapRef);

  const setPlace = async (x: string, y: string) => {
    const latitude = Number(y);
    const longitude = Number(x);
    const coords = new kakao.maps.LatLng(latitude, longitude);
    mapRef.current?.setCenter(coords);

    const address = await kakaomapApi({ latitude, longitude });
    if (address) setAddressName(address);

    setPositionVisible(false);
  };

  return (
    <div style={{ height: '93vh' }}>
      <Map center={position} style={{ width: '100%', height: '100%' }} ref={mapRef}></Map>
      <StyledTop>
        <Topbar>
          <Filter onClick={toggleFilter}>
            <img src="/images/top/filter.png" style={{ width: '35px' }} />
          </Filter>

          <Position onClick={togglePosition}>{addressName}</Position>
        </Topbar>
        <Research onClick={() => handleRefreshClick(mapRef, setAddressName)}>현 지도에서 검색</Research>
      </StyledTop>
      {isFilterVisible && <FilterComponent onClose={toggleFilter} />}
      {isPositionVisible && <SearchPlace onClose={togglePosition} onSelectPlace={setPlace} />}

      <Curpos onClick={updateLocation}>
        <img src="/images/orderfunding/curpos.png" style={{ width: '50px' }} />
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
