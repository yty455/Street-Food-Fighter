import { useRef, useState, useEffect } from 'react';
import { StyleSignUp, HeaderStyle, InputWrapper, BodyStyle, FooterStyle, ButtonWrapper } from './SignUp.styled';
import Input from '@/components/common/input';
import RoundButton from '@/components/common/roundbtn';
import { useRouter } from 'next/navigation';
import useSingUpPageStore from '@/stores/signUpStore';
import SignUpFirstPage from '@/components/signup/firstpage';
import SignUpSecondPage from '@/components/signup/secondpage';
import SignUpThirdPage from '@/components/signup/thirdpage';

const SignUpPage = ({ params, ...props }: any) => {
  switch (params.id) {
    case '1':
      return <SignUpFirstPage />;
    case '2':
      return <SignUpSecondPage />;
    case '3':
      return <SignUpThirdPage />;
    default:
      return <div>잘못된 페이지 입니다.</div>;
  }
};

export default SignUpPage;
