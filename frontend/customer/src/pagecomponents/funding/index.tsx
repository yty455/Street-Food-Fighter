import useCurrentLocation from '@/hooks/currentHook';
import { useState, useRef } from 'react';
import { Filter, Position, Research, StyledTop, Topbar } from '../main/Main.styled';
import { Curpos, Day, ResearchBox, Topbar2 } from './Funding.styled';
import { Map } from 'react-kakao-maps-sdk';
import handleRefreshClick from '@/hooks/refreshHook';
import FilterComponent from '@/components/main/filter';

const FundingPage = () => {
  const [addressName, setAddressName] = useState('');
  const mapRef = useRef<kakao.maps.Map>(null);

  // filter
  const [isFilterVisible, setFilterVisible] = useState(false);
  const toggleFilter = () => setFilterVisible(!isFilterVisible);

  const { position, updateLocation } = useCurrentLocation(setAddressName, mapRef);

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
        <Topbar2>
          <Day> 10월 27일</Day>
          <ResearchBox>
            <Research onClick={() => handleRefreshClick(mapRef, setAddressName)}>현 지도에서 검색</Research>
          </ResearchBox>
        </Topbar2>
      </StyledTop>
      {isFilterVisible && <FilterComponent onClose={toggleFilter} isfundingpage="true" />}

      <Curpos onClick={updateLocation}>
        <img src="/images/orderfunding/curpos.png" style={{ width: '50px' }} />
      </Curpos>
    </div>
  );
};

export default FundingPage;
