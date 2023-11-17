import { useRef, useState, useEffect } from 'react';
import { StyleSignUp, HeaderStyle, InputWrapper, BodyStyle, FooterStyle, ButtonWrapper } from '../SingUp.styled';
import Input from '@/components/common/input';
import RoundButton from '@/components/common/roundbtn';
import { useRouter } from 'next/navigation';
import useSingUpPageStore from '@/stores/signUpStore';
import TimeSelector from '@/components/timeselector';

const SignUpThirdPage = ({ params, ...props }: any) => {
  const router = useRouter();
  const { storeName, bank, accountNumber, setRegisterValue } = useSingUpPageStore();

  const moveNextPage = () => {
    // if (email == '' || password == '' || passwordCheck == '') {
    //   alert('모든 항목을 입력해야합니다.');
    //   return;
    // }
    // if (password !== passwordCheck) {
    //   alert('비밀번호가 같지 않습니다.');
    //   return;
    // }
    router.push('/signup/4');
  };

  const handleChange = (e: any, key: 'storeName' | 'bank' | 'accountNumber') => {
    const { name, value } = e.target;
    // 스토어의 setField 함수를 사용하여 스토어의 상태를 업데이트합니다.
    setRegisterValue(key, value);
  };
  return (
    <StyleSignUp>
      {/* header */}
      <HeaderStyle>회원가입</HeaderStyle>
      {/* body */}
      <BodyStyle>
        {/* 운영 시간 들어가야함 */}
        <TimeSelector />
        <InputWrapper>
          <Input
            onChange={(e: any) => handleChange(e, 'storeName')}
            use="info"
            placeholder="가게 이름을 입력해주세요"
            label="가게 정보"
            value={storeName}
          ></Input>
        </InputWrapper>
        <InputWrapper>
          <Input onChange={(e: any) => handleChange(e, 'bank')} use="info" placeholder="은행을 입력해주세요" label="정산 계좌" value={bank}></Input>
        </InputWrapper>
        <InputWrapper>
          <Input
            onChange={(e: any) => handleChange(e, 'accountNumber')}
            use="info"
            placeholder="계좌번호를 입력해주세요"
            value={accountNumber}
          ></Input>
        </InputWrapper>
      </BodyStyle>
      {/* footer */}
      <FooterStyle>
        <ButtonWrapper>
          <RoundButton onClick={moveNextPage} text="계속하기"></RoundButton>
        </ButtonWrapper>
      </FooterStyle>
    </StyleSignUp>
  );
};

export default SignUpThirdPage;
