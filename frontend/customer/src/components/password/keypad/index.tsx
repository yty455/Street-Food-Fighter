import { useState, useEffect } from 'react';
import { CurrentPassword, KeypadContainer, Key, StyleImage } from './Keypad.styled';

const Keypad = ({ onPasswordChange }: any) => {
  const [keys, setKeys] = useState<number[]>([]);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [lastKey, setLastKey] = useState<number>(0); // 마지막 키 상태 추가
  useEffect(() => {
    onPasswordChange(currentPassword);
  }, [currentPassword, onPasswordChange]);

  useEffect(() => {
    const shuffledKeys = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    setKeys(shuffledKeys.slice(0, -1));
    setLastKey(shuffledKeys[shuffledKeys.length - 1]);
  }, []);

  const handleKeyPress = (key: number) => {
    setCurrentPassword((prev) => {
      const isFullPassword = prev.length === 5;

      const newPass = prev.length < 6 ? prev + key.toString() : prev;
      if (isFullPassword) {
        console.log('비밀번호 6자리 입력 완료: ', newPass);
      }
      return newPass;
    });
  };

  const handleErase = () => {
    setCurrentPassword((prev) => prev.slice(0, -1));
  };

  const handleReset = () => {
    const shuffledKeys = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    setKeys(shuffledKeys.slice(0, -1));
    setLastKey(shuffledKeys[shuffledKeys.length - 1]);
    setCurrentPassword('');
  };

  return (
    <>
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
    </>
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
