import { useState } from 'react';
import Input from '@/components/common/input';
import BottomBtn from '@/components/common/bottombtn';
import { Topbar, ContentBox, ModalOverlay, TopContent, Title, StyledButton, SuccessContentBox, FinishText } from './Charge.styled';
import RoundButton from '../roundbtn';

export const Charge = ({ toggleCharge }: any) => {
  const [change, setChange] = useState('');
  const [success, setSuccess] = useState(true);
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
        {!success ? (
          <div>
            <ContentBox>
              <Title>
                <img src="/images/common/fightmoney.png" style={{ width: '30px' }} />
                <div style={{ fontSize: '20px' }}> 충전할 금액을 입력해주세요</div>
              </Title>
              <Input value={change} onChange={handleChange} placeholder="충전할 금액을 입력해주세요" maxLength={25} use="info" />
            </ContentBox>
            <BottomBtn text="충전 하기" />
          </div>
        ) : (
          <SuccessContentBox>
            <img src="/images/signup/finish.png" style={{ width: '130px' }} />
            <div>
              <FinishText>100,000 파이트 머니가</FinishText>
              <FinishText> 충전이 완료되었습니다.</FinishText>
            </div>
            <StyledButton>
              <RoundButton text="돌아가기" font="18px" />
            </StyledButton>
          </SuccessContentBox>
        )}
      </div>
    </ModalOverlay>
  );
};

export default Charge;
