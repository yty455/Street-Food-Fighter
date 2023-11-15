import { Curpos, Filter, Research, Position, StyledTop, Topbar, CardList } from './Main.styled';
import Card from '@/components/main/card';
import FilterComponent from '@/components/common/filter';
import { createRef, useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import handleRefreshClick from '@/hooks/refreshHook';
import useCurrentLocation from '@/hooks/currentHook';
import SearchPlace from '@/components/common/searchplace';
import useSetPlaceHook from '@/hooks/setplaceHook';
import { categories } from '@/assets/category';
import { useRouter } from 'next/navigation';
import { NearVendorsType } from '@/types/nearvendors.type';
import useMainFilterStore from '@/stores/mainFilterStore';
import NearVendorsAPI from '@/apis/vendor/NearVendorsAPI';

const MainPage = () => {
  const [addressName, setAddressName] = useState('');
  const mapRef = useRef<kakao.maps.Map>(null);
  const router = useRouter();

  const [vendors, setVendors] = useState<NearVendorsType>([]);

  const { selectedCategories } = useMainFilterStore();

  useEffect(() => {
    // 1. 현재 위치 이동시 2. 현지도 검색시 3. 카테고리 선택시

    const fetchVendors = async () => {
      const selectedTypes = selectedCategories
        .map((categoryName) => {
          const category = categories.find((c) => c.name === categoryName);
          return category ? category.type : null;
        })
        .filter((type) => type !== null);

      const nearVendorsData = await NearVendorsAPI({
        addressname: addressName,
        categories: selectedTypes,
      });
      if (nearVendorsData) {
        setVendors(nearVendorsData);
      } else {
        console.error('Failed to fetch near flag data');
      }
    };
    fetchVendors();
  }, [addressName, selectedCategories]);

  // filter
  const [isFilterVisible, setFilterVisible] = useState(false);
  const toggleFilter = () => setFilterVisible(!isFilterVisible);

  // position
  const { position, updateLocation } = useCurrentLocation(setAddressName, mapRef);
  const [isPositionVisible, setPositionVisible] = useState(false);
  const togglePosition = () => setPositionVisible(!isPositionVisible);

  const setPlace = useSetPlaceHook(mapRef, setAddressName, setPositionVisible);

  // 캐러셀 시작
  const scrollRef = useRef<any>([]);

  useEffect(() => {
    if (vendors.length > 0) scrollRef.current[0].scrollIntoView({ inline: 'center', block: 'center', behavior: 'smooth' });
  }, [vendors]); // vendors가 변경될 때마다 useEffect 실행

  const moveCardCenter = (event: any, index: number) => {
    scrollRef.current[index].scrollIntoView({ inline: 'center', block: 'center', behavior: 'smooth' });
  };

  // 캐러셀 끝

  return (
    <div style={{ height: '93vh' }}>
      <Map center={position} style={{ width: '100%', height: '100%' }} level={3} ref={mapRef}>
        {vendors &&
          vendors.length > 0 &&
          vendors.map((vendor: any, index: number) => {
            const category = categories.find((c) => c.type === vendor.category);
            const imageSrc = `/images/category/${category?.image}`;
            return (
              <MapMarker
                key={vendor.id || index}
                onClick={(e: any) => moveCardCenter(e, index)}
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
        <div style={{ minWidth: '225px' }} />
        {vendors.map((vendor, index: any) => (
          <div key={vendor.storeId} ref={(el) => (scrollRef.current[index] = el)}>
            <Card
              className="card"
              vendor={vendor}
              onClick={() => {
                router.push(`/vendor/${vendor.storeId}`);
              }}
            />
          </div>
        ))}
        <div style={{ minWidth: '225px' }} />
      </CardList>
    </div>
  );
};

export default MainPage;
