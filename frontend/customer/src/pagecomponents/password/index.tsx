import { useState, useEffect } from 'react';
import { Container, Title } from './Password.styled';
import Keypad from '@/components/password/keypad';
import State from '@/components/password/state';
import usePwdPageStore from '@/stores/pwdpageStore';
import { passwordMessages } from '@/assets/pwdmsg';
import useCurPasswordStore from '@/stores/curpwdStore';

const Password = () => {
  const { currentPassword, resetCurrentPassword } = useCurPasswordStore();
  const { curPwdPage } = usePwdPageStore();
  const msg = passwordMessages[curPwdPage];

  useEffect(() => {
    resetCurrentPassword();
  }, [curPwdPage, resetCurrentPassword]);

  return (
    <Container>
      <Title>{msg}</Title>
      <State currentLength={currentPassword.length} />
      <Keypad />
    </Container>
  );
};

export default Password;
