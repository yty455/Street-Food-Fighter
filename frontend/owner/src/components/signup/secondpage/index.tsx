import { useRef, useState, useEffect } from 'react';
import { StyleSignUp, HeaderStyle, InputWrapper, BodyStyle, FooterStyle, ButtonWrapper } from '../SingUp.styled';
import Input from '@/components/common/input';
import RoundButton from '@/components/common/roundbtn';
import { useRouter } from 'next/navigation';
import useSingUpPageStore from '@/stores/signUpStore';

const SignUpSecondPage = ({ params, ...props }: any) => {
  const router = useRouter();
  const { password, passwordCheck, setRegisterValue } = useSingUpPageStore();

  const moveNextPage = () => {
    if (password == '' || password != passwordCheck) {
      alert('패스워드가 일치하지 않습니다.');
      return;
    }
    router.push('/signup/3');
  };

  const handleChange = (e: any, key: 'password' | 'passwordCheck') => {
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
        <InputWrapper>
          <Input
            onChange={(e: any) => handleChange(e, 'password')}
            use="info"
            placeholder="비밀번호를 입력해주세요"
            label="비밀번호를 입력해주세요!"
            value={password}
          ></Input>
        </InputWrapper>
        <InputWrapper>
          <Input
            onChange={(e: any) => handleChange(e, 'passwordCheck')}
            use="info"
            placeholder="비밀번호를 한번 더 입력해주세요"
            label="한번 더!"
            value={passwordCheck}
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

export default SignUpSecondPage;
