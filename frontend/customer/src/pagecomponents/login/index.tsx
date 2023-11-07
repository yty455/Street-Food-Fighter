import { useRef, useState } from 'react';
import { StyleLogin, HeaderStyle, InputWrapper, BodyStyle, FooterStyle } from "./Login.styled"
import Input from '@/components/common/input';

const LoginPage = () => {

    return (
        <StyleLogin>
            <HeaderStyle>로그인</HeaderStyle>
            <BodyStyle>
                <InputWrapper>
                    <Input use="info" placeholder="이메일을 입력해주세요" label="로그인이 필요해요 :)"></Input>
                </InputWrapper>

                <InputWrapper marginTop="30px">
                    <Input use="info" placeholder="비밀번호를 입력해주세요"></Input>
                </InputWrapper>
            </BodyStyle>
            <FooterStyle></FooterStyle>
        </StyleLogin>
    );
};

export default LoginPage;
