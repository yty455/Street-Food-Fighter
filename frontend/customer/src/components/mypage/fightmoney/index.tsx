import Button from '@/components/common/button';
import { ChargeBox, Point, PointContainer, TitleBox } from './Fightmoney.styled';

const Fightmoney = () => {
  const userpoint = 10000;
  return (
    <PointContainer>
      <TitleBox>
        <img src="images/common/fightmoney.png" style={{ width: '40px' }} />
        <div>파이트 머니</div>
      </TitleBox>
      <ChargeBox>
        <Point>총 {Number(userpoint).toLocaleString()} F</Point>
        <div style={{ height: '40px' }}>
          <Button text="충전하기" fontsize="18px" />
        </div>
      </ChargeBox>
    </PointContainer>
  );
};

export default Fightmoney;
