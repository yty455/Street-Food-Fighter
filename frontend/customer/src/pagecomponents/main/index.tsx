import { Curpos, Filter, Research, Position, StyledTop, Topbar, CardList } from './Main.styled';
import Card from '@/components/main/card';
import FilterComponent from '@/components/main/filter';
import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

const MainPage = () => {
  const [isFilterVisible, setFilterVisible] = useState(false);

  const toggleFilter = () => setFilterVisible(!isFilterVisible);

  return (
    <div style={{ height: '93vh' }}>
      <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: '100%', height: '100%' }}></Map>
      <StyledTop>
        <Topbar>
          <Filter onClick={toggleFilter}>
            <img src="/images/top/filter.png" style={{ width: '35px' }} />
          </Filter>

          <Position>부산시 강서구 녹산동</Position>
        </Topbar>
        <Research>현 위치에서 재검색</Research>
      </StyledTop>
      {isFilterVisible && <FilterComponent onClose={toggleFilter} />}

      <Curpos>
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
