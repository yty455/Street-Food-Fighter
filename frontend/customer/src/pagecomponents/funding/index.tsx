import useCurrentLocation from '@/hooks/currentHook';
import { useState, useRef } from 'react';
import { Filter, Position, Research, StyledTop, Topbar } from '../main/Main.styled';
import { Curpos, Day, ResearchBox, Topbar2 } from './Funding.styled';
import { Map } from 'react-kakao-maps-sdk';
import handleRefreshClick from '@/hooks/refreshHook';
import FilterComponent from '@/components/common/filter';
import useSelectedDateStore from '@/stores/selectdateStore';
import useDateOptions from '@/hooks/sevendaysHook';
import useSetPlaceHook from '@/hooks/setplaceHook';
import SearchPlace from '@/components/common/searchplace';

const FundingPage = () => {
  const [addressName, setAddressName] = useState('');
  const mapRef = useRef<kakao.maps.Map>(null);
  const { selectedDate } = useSelectedDateStore();
  const { formatDate } = useDateOptions();
  // filter
  const [isFilterVisible, setFilterVisible] = useState(false);
  const toggleFilter = () => setFilterVisible(!isFilterVisible);

  // position
  const { position, updateLocation } = useCurrentLocation(setAddressName, mapRef);
  const [isPositionVisible, setPositionVisible] = useState(false);
  const togglePosition = () => setPositionVisible(!isPositionVisible);

  const setPlace = useSetPlaceHook(mapRef, setAddressName, setPositionVisible);

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
        <Topbar2>
          <Day onClick={toggleFilter}> {selectedDate ? formatDate(selectedDate, false) : '날짜 없음'}</Day>
          <ResearchBox>
            <Research onClick={() => handleRefreshClick(mapRef, setAddressName)}>현 지도에서 검색</Research>
          </ResearchBox>
        </Topbar2>
      </StyledTop>
      {isFilterVisible && <FilterComponent onClose={toggleFilter} isfundingpage="true" />}
      {isPositionVisible && <SearchPlace onClose={togglePosition} onSelectPlace={setPlace} />}

      <Curpos onClick={updateLocation}>
        <img src="/images/orderfunding/curpos.png" style={{ width: '50px' }} />
      </Curpos>
    </div>
  );
};

export default FundingPage;
