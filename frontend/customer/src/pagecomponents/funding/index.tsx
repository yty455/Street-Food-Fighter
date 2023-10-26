import { useEffect, useState } from 'react';
import { Filter, Position, Research, StyledTop, Topbar } from '../main/Main.styled';
import { ButtonList } from './Funding.styled';

declare global {
  interface Window {
    kakao: any;
  }
}
const FundingPage = () => {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      setMap(new window.kakao.maps.Map(container, options));
      setMarker(new window.kakao.maps.Marker());
    });
  }, []);
  return (
    <div>
      <StyledTop>
        <Topbar>
          <Filter>
            <img src="/images/top/filter.png" style={{ width: '35px' }} />
          </Filter>

          <Position>부산시 강서구 녹산동</Position>
        </Topbar>
      </StyledTop>

      <ButtonList>
        <div>
          <img src="/images/orderfunding/refresh.png" style={{ width: '40px' }} />
        </div>
        <div>
          <img src="/images/orderfunding/curpos.png" style={{ width: '40px' }} />
        </div>
      </ButtonList>

      <div style={{ height: '95vh' }}>
        <div id="map" style={{ width: '100%', height: '100%' }}></div>
      </div>
    </div>
  );
};

export default FundingPage;
