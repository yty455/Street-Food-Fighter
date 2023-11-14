import Button from '@/components/common/button';
import { ChargeBox, Point, PointContainer, TitleBox } from './Fightmoney.styled';
import { useEffect, useState } from 'react';
import GetPointAPI from '@/apis/user/GetPointAPI';

const Fightmoney = ({ toggleCharge }: any) => {
  const [userpoint, setUserpoint] = useState(0);
  useEffect(() => {
    const fetchPoints = async () => {
      const res = await GetPointAPI();
      if (res) setUserpoint(res.amount);
    };

    fetchPoints();
  }, []);

  return (
    <PointContainer>
      <TitleBox>
        <img src="images/common/fightmoney.png" style={{ width: '40px' }} />
        <div>파이트 머니</div>
      </TitleBox>
      <ChargeBox>
        <Point>총 {Number(userpoint).toLocaleString()} F</Point>
        <div style={{ height: '40px' }}>
          <Button text="충전하기" fontsize="18px" onClick={toggleCharge} />
        </div>
      </ChargeBox>
    </PointContainer>
  );
};

export default Fightmoney;
