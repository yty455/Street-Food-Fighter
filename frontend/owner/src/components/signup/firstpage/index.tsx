import { useRef, useState, useEffect } from 'react';
import { StyleSignUp, HeaderStyle, InputWrapper, BodyStyle, FooterStyle, ButtonWrapper } from '../SingUp.styled';
import Input from '@/components/common/input';
import RoundButton from '@/components/common/roundbtn';
import { useRouter } from 'next/navigation';
import useSingUpPageStore from '@/stores/signUpStore';

const SignUpFirstPage = ({ params, ...props }: any) => {
  const router = useRouter();
  const { email, name, phone, setRegisterValue } = useSingUpPageStore();

  const moveNextPage = () => {
    // if (email == '' || password == '' || passwordCheck == '') {
    //   alert('모든 항목을 입력해야합니다.');
    //   return;
    // }
    // if (password !== passwordCheck) {
    //   alert('비밀번호가 같지 않습니다.');
    //   return;
    // }
    router.push('/signup/2');
  };

  useEffect(() => {
    console.log();
  }, [email]);

  const handleChange = (e: any, key: 'email' | 'name' | 'phone') => {
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
