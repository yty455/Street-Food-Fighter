import { useRef, useState } from 'react';
import { StyleLogin, HeaderStyle, InputWrapper, BodyStyle, FooterStyle, ButtonWrapper, ButtonList } from './Login.styled';
import Input from '@/components/common/input';
// import RoundButton from '@/components/common/roundbtn';
import RoundBtn from '@/components/common/roundbtn';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();

  const moveRegisterPage = () => {
    router.push('/signup/1');
  };
  return (
    <StyleLogin>
      {/* header */}
      <HeaderStyle>로그인</HeaderStyle>
      {/* body */}
      <BodyStyle>
        <InputWrapper>
          <Input use="info" placeholder="이메일을 입력해주세요" label="로그인이 필요해요 :)"></Input>
        </InputWrapper>
        <InputWrapper marginTop="30px">
          <Input use="info" placeholder="비밀번호를 입력해주세요"></Input>
        </InputWrapper>
        <ButtonList>
          <ButtonWrapper>
            <RoundBtn text="시작하기"></RoundBtn>
          </ButtonWrapper>
          <ButtonWrapper>
            <RoundBtn onClick={moveRegisterPage} text="회원가입" borderSize="1px" color="white"></RoundBtn>
          </ButtonWrapper>
        </ButtonList>
      </BodyStyle>
      {/* footer */}
      <FooterStyle></FooterStyle>
    </StyleLogin>
  );
};

export default LoginPage;
