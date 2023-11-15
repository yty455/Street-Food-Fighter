import { useRef, useState, useEffect } from 'react';
import { StyleSignUp, HeaderStyle, InputWrapper, BodyStyle, FooterStyle, ButtonWrapper } from '../SingUp.styled';
import Input from '@/components/common/input';
import RoundButton from '@/components/common/roundbtn';
import { useRouter } from 'next/navigation';
import useSignUpPageStore from '@/stores/signUpStore';

const SignUpFirstPage = ({ params, ...props }: any) => {
  const router = useRouter();
  const { email, name, phone, fcmToken, setRegisterValue } = useSignUpPageStore();

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
  const moveNextPage = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    if (name.length == 0 || name.length > 5) {
      alert('이름의 길이는 1~5자 입니다.');
      return;
    }
    if (phone.length != 13) {
      alert('휴대폰 번호가 올바르지 않습니다. ' + phone.length);
      return;
    }
    router.push('/signup/2');
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

  const handleChange = (e: any, key: 'email' | 'name' | 'phone') => {
    const { name, value } = e.target;
    // 스토어의 setField 함수를 사용하여 스토어의 상태를 업데이트합니다.
    if (key == 'phone') {
      setRegisterValue(key, formatPhoneNumber(value));
    } else if (key == 'name') {
      if (value.length <= 5) setRegisterValue(key, value);
    } else {
      setRegisterValue(key, value);
    }
  };

  return (
    <StyleSignUp>
      {/* header */}
      <HeaderStyle>회원가입</HeaderStyle>
      {/* body */}
      <BodyStyle>
        <InputWrapper>
          <Input
            onChange={(e: any) => handleChange(e, 'email')}
            use="info"
            placeholder="이메일을 입력해주세요"
            label="회원가입을 진행해볼까요?)"
            value={email}
          ></Input>
        </InputWrapper>
        <InputWrapper>
          <Input
            onChange={(e: any) => handleChange(e, 'name')}
            use="info"
            placeholder="이름을 알려주세요!"
            label="이름을 입력해주세요"
            value={name}
          ></Input>
        </InputWrapper>
        <InputWrapper>
          <Input
            onChange={(e: any) => handleChange(e, 'phone')}
            use="info"
            placeholder="전화번호를 입력해주세요"
            label="손님이 전화할 수 있어요!"
            value={phone}
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

export default SignUpFirstPage;
