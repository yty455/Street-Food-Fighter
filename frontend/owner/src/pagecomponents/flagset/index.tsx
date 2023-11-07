import SearchPlace from '@/components/flagset/searchplace';
import useCurrentLocation from '@/hooks/flagset/currentHook';
import useSetPlaceHook from '@/hooks/flagset/setplaceHook';
import { useState, useRef } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Position, StyledTop, Topbar, Curpos, SettingBox, Title, Content } from './Flagset.styled';
import { useRouter } from 'next/navigation';
import BottomBtn from '@/components/common/bottombtn';

const FlagSetPage = () => {
  const [addressName, setAddressName] = useState('');
  const mapRef = useRef<kakao.maps.Map>(null);

  const router = useRouter();
  // position
  const { position, updateLocation } = useCurrentLocation(setAddressName, mapRef);
  const [isPositionVisible, setPositionVisible] = useState(false);
  const togglePosition = () => setPositionVisible(!isPositionVisible);

  const setPlace = useSetPlaceHook(mapRef, setAddressName, setPositionVisible);

  const [markerPosition, setMarkerPosition] = useState(null);

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
      <SettingBox>
        <Title>영업날짜</Title>
        <Content> 2023 / 11 / 07</Content>
        <Title>영업시간</Title>
        <Content>영업 시간을 선택해 주세요</Content>
      </SettingBox>
      <BottomBtn text="깃발 추가" />
    </div>
  );
};

export default FlagSetPage;
