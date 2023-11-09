import { useState, useEffect } from 'react';
import { KeypadContainer, Key, StyleImage } from './Keypad.styled';
import { useRouter } from 'next/navigation';
import usePwdPageStore from '@/stores/pwdpageStore';
import usePasswordStore from '@/stores/passwordStore';
import useCurPasswordStore from '@/stores/curpwdStore';
import { user } from '@/temp/user';
import useRegisterPageStore from '@/stores/registerStore';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

const Keypad = ({ slug }: { slug: string }) => {
  const [keys, setKeys] = useState<number[]>([]);
  const { currentPassword, setCurrentPassword, resetCurrentPassword } = useCurPasswordStore();
  const { curPwdPage, setCurPwdPage } = usePwdPageStore();
  const [lastKey, setLastKey] = useState<number>(0);
  const { setPassword, resetPasswords, wantPwd, againPwd } = usePasswordStore();

  //회원가입
  const setRegisterValue = useRegisterPageStore((state) => state.setRegisterValue);
  const paypassword = useRegisterPageStore((state) => state.paypassword);

  const router = useRouter();

  useEffect(() => {
    const shuffledKeys = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    setKeys(shuffledKeys.slice(0, -1));
    setLastKey(shuffledKeys[shuffledKeys.length - 1]);
  }, []);

  const handleComplete = () => {
    const currentPassword = useCurPasswordStore.getState().currentPassword;

    if (slug == 'change') {
      if (curPwdPage === 1) {
        if (currentPassword === user.paymentPassword) {
          setCurPwdPage(2);
          setPassword(1, currentPassword);
        } else {
          alert('Incorrect password.');
          resetCurrentPassword();
        }
      } else if (curPwdPage === 2) {
        setCurPwdPage(3);
        setPassword(2, currentPassword);
      } else if (curPwdPage === 3) {
        setPassword(3, currentPassword);
        if (wantPwd === currentPassword) {
          resetPasswords();
          alert('Password changed successfully.');
          router.back();
          setCurPwdPage(1);
        } else {
          resetCurrentPassword();
          // 변경 비밀번호로 api호출 (이후 코드 추가)
        }
      }
    }

    // 회원가입할때,
    if (slug == 'register') {
      if (curPwdPage === 1) {
        setPassword(1, currentPassword);
        setRegisterValue('paypassword', currentPassword);
        setCurPwdPage(3);
      } else if (curPwdPage === 3) {
        setPassword(3, currentPassword);
        if (paypassword === currentPassword) {
          resetPasswords();
          console.log('비밀번호 입력 성공.');
          router.push('/');
          setCurPwdPage(1);
        } else {
          resetCurrentPassword();
        }
      }
    }
  };

  const handleKeyPress = (key: number) => {
    const newPass = currentPassword.length < 6 ? currentPassword + key.toString() : currentPassword;

    setCurrentPassword(newPass);

    if (newPass.length === 6) {
      handleComplete();
      handleReset();
    }
  };

  const handleErase = () => {
    setCurrentPassword(currentPassword.slice(0, -1));
  };

  const handleReset = () => {
    const shuffledKeys = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    setLastKey(shuffledKeys[shuffledKeys.length - 1]);
    setKeys(shuffledKeys.slice(0, -1));
    setCurrentPassword('');
  };

  return (
    <KeypadContainer>
      {keys.map((number) => (
        <Key key={number} onClick={() => handleKeyPress(number)}>
          {number}
        </Key>
      ))}
      <Key onClick={handleReset}>
        <StyleImage src="/images/signup/reset.png" alt="Reset" />
      </Key>
      <Key onClick={() => handleKeyPress(lastKey)}>{lastKey}</Key>
      <Key onClick={handleErase}>
        <StyleImage src="/images/signup/erase.png" alt="Erase" />
      </Key>
    </KeypadContainer>
  );
};
function shuffleArray(array: number[]): number[] {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
export default Keypad;
