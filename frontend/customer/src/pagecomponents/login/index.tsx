import { useRef, useState } from 'react';
import { StyleLogin, HeaderStyle, InputWrapper, BodyStyle, FooterStyle, ButtonWrapper } from './Login.styled';
import Input from '@/components/common/input';
import RoundButton from '@/components/common/roundbtn';
import { useRouter } from 'next/navigation';
import LoginAPI from '@/apis/user/LoginAPI';
const LoginPage = () => {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });

  const login = async () => {
    try {
      const result: any = await LoginAPI(loginInfo);
      const accessToken = result.headers['authorization'];
      const refreshToken = result.headers['authorization-refresh'];
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessToken', accessToken);
      console.log(result);
      // alert('로그인에 성공하셨습니다.');
    } catch (error) {
      alert('로그인에 실패하셨습니다.');
    }
  };
  const moveRegisterPage = () => {
    router.push('/register/1');
  };
  return (
    <StyleLogin>
      {/* header */}
      <HeaderStyle>로그인</HeaderStyle>
      {/* body */}
      <BodyStyle>
        <InputWrapper>
          <Input
            value={loginInfo.email}
            onChange={(e: any) => setLoginInfo((prev) => ({ ...prev, email: e.target.value }))}
            use="info"
            placeholder="이메일을 입력해주세요"
            label="로그인이 필요해요 :)"
          ></Input>
        </InputWrapper>
        <InputWrapper $margintop="30px">
          <Input
            value={loginInfo.password}
            type="password"
            onChange={(e: any) => setLoginInfo((prev) => ({ ...prev, password: e.target.value }))}
            use="info"
            placeholder="비밀번호를 입력해주세요"
          ></Input>
        </InputWrapper>
        <ButtonWrapper>
          <RoundButton onClick={login} text="시작하기"></RoundButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <RoundButton onClick={moveRegisterPage} text="회원가입" bordersize="1px" color="white"></RoundButton>
        </ButtonWrapper>
      </BodyStyle>
      {/* footer */}
      <FooterStyle>
        <ButtonWrapper>
          <RoundButton text="카카오로 시작"></RoundButton>
        </ButtonWrapper>
      </FooterStyle>
    </StyleLogin>
  );
};

export default LoginPage;
