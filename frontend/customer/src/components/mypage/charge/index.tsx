import { useState } from 'react';
import Input from '@/components/common/input';
import BottomBtn from '@/components/common/bottombtn';
import { Topbar } from '@/pagecomponents/userinfo/Userinfo.styled';
import { ContentBox, ModalOverlay, TopContent, Title } from './Charge.styled';

const Charge = ({ toggleCharge }: any) => {
  const [change, setChange] = useState('');
  const handleChange = (e: any) => {
    setChange(e.target.value);
  };

  return (
    <ModalOverlay>
      <div>
        <Topbar>
          <TopContent>
            <img src="/images/top/back.png" style={{ width: '25px' }} onClick={toggleCharge} />
            <div> 파이트 머니 충전하기 </div>
          </TopContent>
        </Topbar>
        <ContentBox>
          <Title>
            <img src="/images/common/fightmoney.png" style={{ width: '30px' }} />
            <div style={{ fontSize: '20px' }}> 충전할 금액을 입력해주세요</div>
          </Title>
          <Input value={change} onChange={handleChange} placeholder="충전할 금액을 입력해주세요" maxLength={25} use="info" />
        </ContentBox>
        <BottomBtn text="충전 하기" />
      </div>
    </ModalOverlay>
  );
};

export default Charge;
