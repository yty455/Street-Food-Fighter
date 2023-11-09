import { useRef, useState, useEffect } from 'react';
import { StyleSignUp, HeaderStyle, InputWrapper, BodyStyle, FooterStyle, ButtonWrapper } from './SignUp.styled';
import Input from '@/components/common/input';
import RoundButton from '@/components/common/roundbtn';
import { useRouter } from 'next/navigation';
import useSingUpPageStore from '@/stores/signUpStore';
import SignUpFirstPage from '@/components/signup/firstpage';

const SignUpPage = ({ params, ...props }: any) => {
  switch (params.id) {
    case '1':
      return <SignUpFirstPage />;
    default:
      return <div>잘못된 페이지 입니다.</div>;
  }
};

export default SignUpPage;
