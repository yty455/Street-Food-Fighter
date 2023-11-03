import { PwdPageKey, passwordMessages } from '@/assets/pwdmsg';
import Keypad from '@/components/password/keypad';
import State from '@/components/password/state';
import usePwdpageStore from '@/stores/pwdpageStore';
import { useState } from 'react';
import { Container, Title } from './Password.styled';

const Password = () => {
  const [currentPassword, setCurrentPassword] = useState('');

  const handlePasswordChange = (value: any) => {
    setCurrentPassword(value);
  };

  const { curPwdPage } = usePwdpageStore();
  const msg = passwordMessages[curPwdPage as PwdPageKey];
  return (
    <Container>
      <Title>{msg}</Title>
      {/* <div> 비밀번호 :{currentPassword} </div> */}
      <State currentLength={currentPassword.length} />
      <Keypad onPasswordChange={handlePasswordChange} />
    </Container>
  );
};

export default Password;
