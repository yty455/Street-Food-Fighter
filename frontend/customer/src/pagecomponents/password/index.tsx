import Keypad from '@/components/password/keypad';
import { useState } from 'react';

const Password = () => {
  const [currentPassword, setCurrentPassword] = useState('');

  const handlePasswordChange = (value: any) => {
    setCurrentPassword(value);
  };

  return (
    <div>
      <div> 비밀번호를 입력해주세요 </div>
      <div> 비밀번호 :{currentPassword} </div>
      <Keypad onPasswordChange={handlePasswordChange} />
    </div>
  );
};

export default Password;
