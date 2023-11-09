import useFindCurrentLoc from '@/hooks/common/findcurrentloc.hook';
import { ModalOverlay, ModalContent, CloseButton, Content, Title, Text } from './Startpopup.styled';
import { useState, useEffect } from 'react';
const StartPopup = ({ onClose }: any) => {
  const [addressName, setAddressName] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
  }, []);

  useFindCurrentLoc(setAddressName);

  return (
    <ModalOverlay>
      <ModalContent>
        <Content>
          <Title>영업 시작 🚀</Title>
          <div>
            <Text>{addressName || '위치 로딩 중...'}</Text>
            <Text>{currentTime}</Text>
          </div>
        </Content>
        <CloseButton onClick={onClose}>영업 시작하기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StartPopup;
