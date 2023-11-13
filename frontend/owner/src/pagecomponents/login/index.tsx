import { useRef, useState, useEffect } from 'react';
import { StyleLogin, HeaderStyle, InputWrapper, BodyStyle, FooterStyle, ButtonWrapper, ButtonList } from './Login.styled';
import Input from '@/components/common/input';
import RoundBtn from '@/components/common/roundbtn';
import { useRouter } from 'next/navigation';
import LoginAPI from '@/apis/login/Login';
import OwnerInfoStore from '@/stores/ownerinfo/ownerInfoStore';
import useSetOwnerInfoHook from '@/hooks/owner/ownerInfo.hook';

const LoginPage = () => {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({ email: 'owner@owner.com', password: '1234' });
  const setOwner = useSetOwnerInfoHook();

  const moveRegisterPage = (e: any) => {
    router.push('/signup/1');
  };

  const changeLoginInfo = (e: any) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login = async () => {
    try {
      const result = await LoginAPI(loginInfo);
      const accessToken = result.headers['authorization'];
      const refreshToken = result.headers['authorization-refresh'];
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
      setOwner(accessToken);
      alert('로그인에 성공 하셨습니다.');
      router.push('/');
    } catch (error) {
      console.error(Error);
      alert('로그인에 실패 하셨습니다.');
    }
  };

  return (
    <StyleLogin>
      {/* header */}
      <HeaderStyle>로그인</HeaderStyle>
      {/* body */}
      <BodyStyle>
        <InputWrapper>
          <Input
            use="info"
            name="email"
            value={loginInfo.email}
            onChange={changeLoginInfo}
            placeholder="이메일을 입력해주세요"
            label="로그인이 필요해요 :)"
          ></Input>
        </InputWrapper>
        <InputWrapper margintop="30px">
          <Input use="info" name="password" value={loginInfo.password} onChange={changeLoginInfo} placeholder="비밀번호를 입력해주세요"></Input>
        </InputWrapper>
        <ButtonList>
          <ButtonWrapper>
            <RoundBtn onClick={login} text="시작하기"></RoundBtn>
          </ButtonWrapper>
          <ButtonWrapper>
            <RoundBtn onClick={moveRegisterPage} text="회원가입" bordersize="1px" color="white"></RoundBtn>
          </ButtonWrapper>
        </ButtonList>
      </BodyStyle>
      {/* footer */}
      <FooterStyle></FooterStyle>
    </StyleLogin>
  );
};

export default LoginPage;
