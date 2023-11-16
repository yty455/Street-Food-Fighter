import useCurrentLocation from '@/hooks/currentHook';
import { useState, useRef, useEffect } from 'react';
import { Filter, Position, Research, StyledTop, Topbar } from '../main/Main.styled';
import { CardList, Curpos, Day, ResearchBox, Topbar2 } from './Funding.styled';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import handleRefreshClick from '@/hooks/refreshHook';
import FilterComponent from '@/components/common/filter';
import useSelectedDateStore from '@/stores/selectdateStore';
import useDateOptions from '@/hooks/sevendaysHook';
import useSetPlaceHook from '@/hooks/setplaceHook';
import SearchPlace from '@/components/common/searchplace';
import { NearFlagType } from '@/types/nearflags.type';
import useMainFilterStore from '@/stores/mainFilterStore';
import { categories } from '@/assets/category';
import Card from '@/components/main/card';
import { useRouter } from 'next/navigation';
import NearflagAPI from '@/apis/flag/NearflagAPI';
import useFlagIdStore from '@/stores/flagidStore';

const FundingPage = () => {
  const router = useRouter();

  const [addressName, setAddressName] = useState('부산광역시 강서구 송정동');
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

  const [flags, setFlags] = useState<NearFlagType[]>([]);
  const { selectedCategories } = useMainFilterStore();

  const { setFlagId } = useFlagIdStore();

  useEffect(() => {
    // 1. 현재 위치 이동시 / 2. 현지도 검색시 / 3. 카테고리 선택시 / 4. 날짜 선택시

    const fetchFlags = async () => {
      // console.log('가게정보 불러오기(1,2)', addressName);
      const selectedTypes = selectedCategories
        .map((categoryName) => {
          const category = categories.find((c) => c.name === categoryName);
          return category ? category.type : null;
        })
        .filter((type) => type !== null);
      // console.log('가게정보 불러오기(3)', selectedTypes);

      const formattedDate = selectedDate ? selectedDate.toLocaleDateString('en-CA') : null;
      // console.log('깃발 정보 불러오기(4)', formattedDate);

      const nearFlagsData = await NearflagAPI({
        addressname: addressName,
        categories: selectedTypes,
        date: formattedDate,
      });
      if (nearFlagsData) {
        // console.log(nearFlagsData);
        setFlags(nearFlagsData);
      } else {
        console.error('Failed to fetch near flag data');
      }

      //console.log(nearFlagsData);
    };
    fetchFlags();
  }, [addressName, selectedCategories, selectedDate]);

  // 캐러셀 시작
  const scrollRef = useRef<any>([]);

  useEffect(() => {
    if (flags.length > 0) scrollRef.current[0].scrollIntoView({ inline: 'center', block: 'center', behavior: 'smooth' });
  }, [flags]); // vendors가 변경될 때마다 useEffect 실행

  const moveCenter = (event: any, index: number) => {
    const vendor = flags[index];

    if (mapRef.current) {
      mapRef.current.setCenter(new kakao.maps.LatLng(vendor.lati, vendor.longi));
    }

    scrollRef.current[index].scrollIntoView({ inline: 'center', block: 'center', behavior: 'smooth' });
  };

  // 캐러셀 끝

  return (
    <div style={{ height: '93vh' }}>
      <Map center={position} style={{ width: '100%', height: '100%' }} ref={mapRef}>
        {flags &&
          flags.length > 0 &&
          flags.map((vendor: any, index: number) => {
            const category = categories.find((c) => c.type === vendor.category);
            const imageSrc = `/images/category/${category?.image}`;
            return (
              <MapMarker
                key={index}
                onClick={(e: any) => moveCenter(e, index)}
                position={{ lat: vendor.flag.lati, lng: vendor.flag.longi }}
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
      <CardList>
        <div style={{ minWidth: '225px' }} />
        {flags.map((vendor, index) => (
          <div key={vendor.storeId} ref={(el) => (scrollRef.current[index] = el)}>
            <Card
              key={index} // index를 key로 사용
              vendor={vendor}
              onClick={() => {
                setFlagId(vendor.flag.flagId);
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

export default FundingPage;
