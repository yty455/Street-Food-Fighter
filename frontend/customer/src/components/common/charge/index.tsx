import { useState } from 'react';
import Input from '@/components/common/input';
import BottomBtn from '@/components/common/bottombtn';
import { Topbar, ContentBox, ModalOverlay, TopContent, Title, StyledButton, SuccessContentBox, FinishText } from './Charge.styled';
import RoundButton from '../roundbtn';
import ChargeAPI from '@/apis/user/ChargeAPI';

export const Charge = ({ toggleCharge, onBack }: any) => {
  const [change, setChange] = useState('');
  const [formatChange, setFormatChange] = useState('');
  const [success, setSuccess] = useState(false);
  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    const formattedValue = new Intl.NumberFormat('en-US').format(numericValue);
    setFormatChange(formattedValue);
    setChange(inputValue);
  };

  const handleToCharge = async () => {
    const data = {
      amount: parseInt(change),
      isCharge: true,
      paymentPassword: '',
    };
    const res = await ChargeAPI({ data });
    if (res) {
      setSuccess(true);
      if (onBack) {
        onBack();
      }
    }
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
              <Input value={formatChange} onChange={handleChange} placeholder="충전할 금액을 입력해주세요" maxLength={25} use="info" />
            </ContentBox>
            <BottomBtn text="충전 하기" onClick={handleToCharge} />
          </div>
        ) : (
          <SuccessContentBox>
            <img src="/images/signup/finish.png" style={{ width: '130px' }} />
            <div>
              <FinishText>{Number(change).toLocaleString()} 파이트 머니가</FinishText>
              <FinishText> 충전이 완료되었습니다.</FinishText>
            </div>
            <StyledButton onClick={toggleCharge}>
              <RoundButton text="돌아가기" font="18px" />
            </StyledButton>
          </SuccessContentBox>
        )}
      </div>
    </ModalOverlay>
  );
};

export default Charge;
