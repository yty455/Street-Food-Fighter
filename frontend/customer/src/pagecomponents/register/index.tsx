import { useRef, useState, useEffect } from 'react';
import { StyleLogin, HeaderStyle, InputWrapper, BodyStyle, FooterStyle, ButtonWrapper } from './Login.styled';
import Input from '@/components/common/input';
import RoundButton from '@/components/common/roundbtn';
import { useRouter } from 'next/navigation';
import useRegisterPageStore from '@/stores/registerStore';

const RegisterPage = ({ params, ...props }: any) => {
  const router = useRouter();
  const { fcmToken, email, password, passwordCheck, nickname, phone, setRegisterValue } = useRegisterPageStore();

  // 플러터 설정
  const setToken = function () {
    return new Promise((resolve) => {
      if ((window as any).flutter_inappwebview) {
        (window as any).flutter_inappwebview.callHandler('handleFoo').then(function (result: any) {
          setRegisterValue('fcmToken', JSON.stringify(result.fcmT).slice(1, -1));
          resolve(JSON.stringify(result.fcmT).slice(1, -1));
        });
      } else {
        resolve(null);
      }
    });
  };

  useEffect(() => {
    setToken();
  }, []);
  // 플러터 섫정 끝

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const formatPhoneNumber = (value: string): string => {
    if (!value) return value;

    // 숫자만 있는 문자열로 변환
    const phoneNumber = value.replace(/[^\d]/g, '');

    // 전화번호 형식에 맞게 하이픈 추가
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 8) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const moveNextPage = () => {
    if (email == '' || password == '' || passwordCheck == '') {
      alert('모든 항목을 입력해야합니다.');
      return;
    }
    if (!validateEmail(email)) {
      alert('이메일 형식이 아닙니다.');
      return;
    }
    if (password !== passwordCheck) {
      alert('비밀번호가 같지 않습니다.');
      return;
    }
    router.push('/register/2');
  };

  const movePasswordPage = () => {
    if (nickname.length == 0 || nickname.length > 10) {
      alert('닉네임의 길이는 1~10자 입니다.');
      return;
    }
    if (phone.length != 13) {
      alert('휴대폰 번호가 올바르지 않습니다. ' + phone.length);
      return;
    }
    router.push('/password/register');
  };

  const handleChange = (e: any, key: 'email' | 'password' | 'passwordCheck' | 'nickname' | 'phone') => {
    const { name, value } = e.target;
    // 스토어의 setField 함수를 사용하여 스토어의 상태를 업데이트합니다.
    if (key == 'phone') {
      setRegisterValue(key, formatPhoneNumber(value));
      return;
    }
    setRegisterValue(key, value);
  };

  return (
    <StyleLogin>
      {/* header */}
      <HeaderStyle>회원가입</HeaderStyle>
      {/* body */}
      {params.id == 1 && (
        <>
          <BodyStyle>
            <InputWrapper>
              <Input
                onChange={(e: any) => handleChange(e, 'email')}
                use="info"
                placeholder="이메일을 입력해주세요"
                label="회원가입을 진행해볼까요?)"
              ></Input>
            </InputWrapper>
            <InputWrapper>
              <Input
                onChange={(e: any) => handleChange(e, 'password')}
                use="info"
                placeholder="비밀번호를 입력해주세요"
                label="비밀번호를 입력해주세요!"
              ></Input>
            </InputWrapper>
            <InputWrapper>
              <Input
                onChange={(e: any) => handleChange(e, 'passwordCheck')}
                use="info"
                placeholder="비밀번호를 한번 더 입력해주세요"
                label="한번 더!"
              ></Input>
            </InputWrapper>
          </BodyStyle>
          {/* footer */}
          <FooterStyle>
            <ButtonWrapper>
              <RoundButton onClick={moveNextPage} text="계속하기"></RoundButton>
            </ButtonWrapper>
          </FooterStyle>
        </>
      )}
      {params.id == 2 && (
        <>
          <BodyStyle>
            <InputWrapper>
              <Input
                onChange={(e: any) => handleChange(e, 'nickname')}
                use="info"
                placeholder="닉네임을 입력해주세요"
                label="앱에서 사용할 닉네임이에요!"
              ></Input>
            </InputWrapper>
            <InputWrapper>
              <Input
                onChange={(e: any) => handleChange(e, 'phone')}
                use="info"
                value={phone}
                placeholder="사장님이 전화할 수 있어요!"
                label="전화번호를 입력해주세요"
              ></Input>
            </InputWrapper>
          </BodyStyle>
          {/* footer */}
          <FooterStyle>
            <ButtonWrapper>
              <RoundButton text="회원가입" onClick={movePasswordPage}></RoundButton>
            </ButtonWrapper>
          </FooterStyle>
        </>
      )}
    </StyleLogin>
  );
};

export default RegisterPage;
