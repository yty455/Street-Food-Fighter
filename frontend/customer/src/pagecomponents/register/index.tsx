import { useRef, useState } from 'react';
import { StyleLogin, HeaderStyle, InputWrapper, BodyStyle, FooterStyle, ButtonWrapper } from './Login.styled';
import Input from '@/components/common/input';
import Button from '@/components/common/button';
import RoundButton from '@/components/common/roundbtn';
import { useRouter } from 'next/navigation';

const RegisterPage = ({ params, ...props }: any) => {
  const router = useRouter();

  const moveNextPage = () => {
    router.push('/register/2');
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
              <Input use="info" placeholder="이메일을 입력해주세요" label="회원가입을 진행해볼까요?)"></Input>
            </InputWrapper>
            <InputWrapper>
              <Input use="info" placeholder="비밀번호를 입력해주세요" label="비밀번호를 입력해주세요!"></Input>
            </InputWrapper>
            <InputWrapper>
              <Input use="info" placeholder="비밀번호를 한번 더 입력해주세요" label="한번 더!"></Input>
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
              <Input use="info" placeholder="닉네임을 입력해주세요" label="앱에서 사용할 닉네임이에요!"></Input>
            </InputWrapper>
            <InputWrapper>
              <Input use="info" placeholder="사장님이 전화할 수 있어요!" label="전화번호를 입력해주세요"></Input>
            </InputWrapper>
          </BodyStyle>
          {/* footer */}
          <FooterStyle>
            <ButtonWrapper>
              <RoundButton text="회원가입"></RoundButton>
            </ButtonWrapper>
          </FooterStyle>
        </>
      )}
    </StyleLogin>
  );
};

export default RegisterPage;
