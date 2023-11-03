import { useState, useEffect } from 'react';
import { KeypadContainer, Key, StyleImage } from './Keypad.styled';
import { useRouter } from 'next/navigation';
import usePwdPageStore from '@/stores/pwdpageStore';
import usePasswordStore from '@/stores/passwordStore';
import useCurPasswordStore from '@/stores/curpwdStore';

const Keypad = () => {
  const [keys, setKeys] = useState<number[]>([]);
  const { currentPassword, setCurrentPassword, resetCurrentPassword } = useCurPasswordStore();
  const { curPwdPage, setCurPwdPage } = usePwdPageStore();
  const [lastKey, setLastKey] = useState<number>(0);

  const router = useRouter();

  // 컴포넌트가 마운트될 때 키패드를 섞습니다.
  useEffect(() => {
    const shuffledKeys = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    setKeys(shuffledKeys.slice(0, -1));
    setLastKey(shuffledKeys[shuffledKeys.length - 1]);
  }, []);

  const handleComplete = () => {
    const { setPassword, resetPasswords } = usePasswordStore.getState();
    const currentPassword = useCurPasswordStore.getState().currentPassword;

    if (curPwdPage === 1) {
      setCurPwdPage(2);
      setPassword(1, currentPassword);
    } else if (curPwdPage === 2) {
      setCurPwdPage(3);
      setPassword(2, currentPassword);
    } else if (curPwdPage === 3) {
      setPassword(3, currentPassword);
      // 비밀번호 검증 로직 수행 예정
      resetPasswords();
      console.log('비밀번호 변경 완료');
    }
  };

  const handleKeyPress = (key: number) => {
    const newPass = currentPassword.length < 6 ? currentPassword + key.toString() : currentPassword;

    setCurrentPassword(newPass);

    if (newPass.length === 6) {
      console.log('비밀번호 6자리 입력 완료: ', newPass);
      handleComplete();
    }
  };

  const handleErase = () => {
    setCurrentPassword(currentPassword.slice(0, -1));
  };

  const handleReset = () => {
    const shuffledKeys = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
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
