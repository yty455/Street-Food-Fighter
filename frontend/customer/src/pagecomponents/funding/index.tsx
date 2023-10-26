import { Filter, Position, StyledTop, Topbar } from '../main/Main.styled';
import { ButtonList } from './Funding.styled';
import { Map } from 'react-kakao-maps-sdk';

const FundingPage = () => {
  return (
    <div style={{ height: '92vh' }}>
      <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: '100%', height: '100%' }}></Map>
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
    </div>
  );
};

export default FundingPage;
