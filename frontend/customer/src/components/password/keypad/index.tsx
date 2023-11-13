import { useState, useEffect } from 'react';
import { KeypadContainer, Key, StyleImage } from './Keypad.styled';
import useCurPasswordStore from '@/stores/curpwdStore';
import useCompleteHandler from '@/hooks/paypassword/completeHook';

const Keypad = ({ slug }: { slug: string }) => {
  const [keys, setKeys] = useState<number[]>([]);
  const { currentPassword, setCurrentPassword } = useCurPasswordStore();
  const [lastKey, setLastKey] = useState<number>(0);

  useEffect(() => {
    const shuffledKeys = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    setKeys(shuffledKeys.slice(0, -1));
    setLastKey(shuffledKeys[shuffledKeys.length - 1]);
  }, []);

  // slug 별 handler
  const { handleComplete, resetHandler } = useCompleteHandler(slug);

  const handleKeyPress = async (key: number) => {
    if (currentPassword.length < 7) {
      const newPass = currentPassword + key.toString();
      setCurrentPassword(newPass);

      if (newPass.length === 6) {
        await handleComplete();
        handleReset();
      }
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
