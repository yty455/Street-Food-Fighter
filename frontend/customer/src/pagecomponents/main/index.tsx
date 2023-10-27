import { Curpos, Filter, Research, Position, StyledTop, Topbar, CardList } from './Main.styled';
import Card from '@/components/main/card';
import FilterComponent from '@/components/common/filter';
import { useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import handleRefreshClick from '@/hooks/refreshHook';
import useCurrentLocation from '@/hooks/currentHook';
import SearchPlace from '@/components/common/searchplace';
import useSetPlaceHook from '@/hooks/setplaceHook';
import { vendordata } from '@/temp/vendordata';
import { categories } from '@/assets/category';

const MainPage = () => {
  const [addressName, setAddressName] = useState('');
  const mapRef = useRef<kakao.maps.Map>(null);

  // 임시 : 가게 정보 불러오기
  const vendors = vendordata;
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
      <Map center={position} style={{ width: '100%', height: '100%' }} level={3} ref={mapRef}>
        {vendors &&
          vendors.length > 0 &&
          vendors.map((vendor: any) => {
            const category = categories.find((c) => c.id === vendor.category);
            const imageSrc = `/images/category/${category?.image}`;
            console.log(parseFloat(vendor.lat), parseFloat(vendor.lng));
            return (
              <MapMarker
                key={vendor.id}
                position={{ lat: parseFloat(vendor.lat), lng: parseFloat(vendor.lng) }}
                image={{
                  src: imageSrc,
                  size: { width: 30, height: 30 },
                  options: {
                    offset: {
                      x: 15,
                      y: 30,
                    },
                  },
                }}
              />
            );
          })}
      </Map>
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
        {vendors.map((vendor) => (
          <Card key={vendor.id} vendor={vendor} />
        ))}
        <div />
      </CardList>
    </div>
  );
};

export default MainPage;
