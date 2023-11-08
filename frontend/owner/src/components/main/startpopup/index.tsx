import { ModalOverlay, ModalContent, CloseButton, Content, Title, Text } from './Startpopup.styled';
import { useState, useEffect } from 'react';
const StartPopup = ({ onClose }: any) => {
  const [addressName, setAddressName] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
  }, []);

  return (
    <ModalOverlay>
      <ModalContent>
        <Content>
          <Title>영업 시작 🚀</Title>
          <div>
            <Text>부산시 강서구 녹산산단 335로 7</Text>
            <Text>{currentTime}</Text>
          </div>
        </Content>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StartPopup;
