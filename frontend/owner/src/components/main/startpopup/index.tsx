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
            <Text>{addressName || '부산광역시 강서구 녹산산업중로 333'}</Text>
            <Text>{currentTime}</Text>
          </div>
        </Content>
        <CloseButton onClick={onClose}>영업 시작하기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StartPopup;
