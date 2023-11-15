import useCurrentLocation from '@/hooks/flagset/current.hook';
import useSetPlaceHook from '@/hooks/flagset/setplace.hook';
import { useState, useRef } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Position, StyledTop, Topbar, Curpos } from './Flagset.styled';
import { useRouter } from 'next/navigation';
import BottomBtn from '@/components/common/bottombtn';
import { MarkerPosition } from '@/types/map.type';
import SettingBox from '@/components/flagset/settingbox';
import SearchPlace from '@/components/common/searchplace';
import useFormatDate from '@/hooks/common/formatDate.hook';
import useSelectedDateStore from '@/stores/flag/selectedDateStore';
import AddFlagAPI from '@/apis/flag/AddFlagAPI';

const FlagSetPage = () => {
  const [addressName, setAddressName] = useState('부산광역시 강서구 송정동');
  const mapRef = useRef<kakao.maps.Map>(null);
  const router = useRouter();

  // position
  const { position, updateLocation } = useCurrentLocation(setAddressName, mapRef);
  const [isPositionVisible, setPositionVisible] = useState(false);
  const togglePosition = () => setPositionVisible(!isPositionVisible);

  const setPlace = useSetPlaceHook(mapRef, setAddressName, setPositionVisible);

  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>(null);

  //
  const { selectedDate } = useSelectedDateStore();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleAddClick = async () => {
    const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
    const latitude = markerPosition?.lat || 0;
    const longitude = markerPosition?.lng || 0;
    const addressParts = addressName.split(' ');
    const [region1, region2, region3, region4 = ''] = addressParts;

    const flagData = {
      date: formattedDate,
      openTime: startTime,
      closeTime: endTime,
      address: addressName,
      lati: latitude,
      longi: longitude,
      region1,
      region2,
      region3,
      region4,
    };

    if (latitude == 0 || longitude == 0) {
      alert('깃발을 꽂아주세요');
    } else if (startTime.length == 0 || endTime.length == 0) {
      alert('시간 선택을 완료해주세요');
    } else {
      const result = await AddFlagAPI(flagData);
      if (result) {
        router.push('/flag');
      }
    }
  };
  return (
    <div>
      <Map
        center={position}
        style={{ width: '100vw', height: 'calc(100vh - 60px)' }}
        ref={mapRef}
        onClick={(_t, mouseEvent) =>
          setMarkerPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          })
        }
      >
        {markerPosition && (
          <MapMarker
            position={markerPosition}
            image={{
              src: '/images/common/flag.png',
              size: {
                width: 30,
                height: 40,
              },
              options: {
                offset: {
                  x: 5,
                  y: 40,
                },
              },
            }}
          />
        )}
      </Map>
      <StyledTop>
        <Topbar>
          <img
            src="/images/common/back.png"
            style={{ width: '40px' }}
            onClick={() => {
              router.back();
            }}
          />
          <Position onClick={togglePosition}>{addressName}</Position>
        </Topbar>
      </StyledTop>
      {isPositionVisible && <SearchPlace onClose={togglePosition} onSelectPlace={setPlace} />}

      <Curpos onClick={updateLocation}>
        <img src="/images/common/curpos.png" style={{ width: '50px' }} />
      </Curpos>

      <SettingBox setStartTime={setStartTime} setEndTime={setEndTime} startTime={startTime} endTime={endTime} />
      <BottomBtn text="깃발 추가" onClick={handleAddClick} />
    </div>
  );
};

export default FlagSetPage;
