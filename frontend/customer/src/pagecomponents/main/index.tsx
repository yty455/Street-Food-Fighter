import { Curpos, Filter, Research, Position, StyledTop, Topbar, CardList } from './Main.styled';
import Card from '@/components/main/card';
import FilterComponent from '@/components/common/filter';
import { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import handleRefreshClick from '@/hooks/refreshHook';
import useCurrentLocation from '@/hooks/currentHook';
import SearchPlace from '@/components/common/searchplace';
import useSetPlaceHook from '@/hooks/setplaceHook';
import { nearvendors } from '@/temp/nearvendors';
import { categories } from '@/assets/category';
import { useRouter } from 'next/navigation';
import { NearVendorsType } from '@/types/nearvendors.type';
import useMainFilterStore from '@/stores/mainFilterStore';

const MainPage = () => {
  const [addressName, setAddressName] = useState('');
  const mapRef = useRef<kakao.maps.Map>(null);
  const router = useRouter();

  const [vendors, setVendors] = useState<NearVendorsType>([]);

  const { selectedCategories } = useMainFilterStore();

  // 임시 : 가게 정보 불러오기
  useEffect(() => {
    // 1. 현재 위치 이동시
    // 2. 현지도 검색시
    // 3. 카테고리 선택시
    console.log('가게정보 불러오기(1,2)', addressName);
    const selectedTypes = selectedCategories
      .map((categoryName) => {
        const category = categories.find((c) => c.name === categoryName);
        return category ? category.type : null;
      })
      .filter((type) => type !== null);
    console.log('가게정보 불러오기(3)', selectedTypes);

    // 이후 api연동
    setVendors(nearvendors as NearVendorsType);
  }, [addressName, selectedCategories]);

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
            const category = categories.find((c) => c.type === vendor.category);
            const imageSrc = `/images/category/${category?.image}`;
            return (
              <MapMarker
                key={vendor.id}
                position={{ lat: parseFloat(vendor.lati), lng: parseFloat(vendor.longi) }}
                image={{
                  src: imageSrc,
                  size: { width: 50, height: 50 },
                  options: {
                    offset: {
                      x: 25,
                      y: 25,
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
          <Card
            key={vendor.storeId}
            vendor={vendor}
            onClick={() => {
              router.push(`/vendor/${vendor.storeId}`);
            }}
          />
        ))}
        <div />
      </CardList>
    </div>
  );
};

export default MainPage;
