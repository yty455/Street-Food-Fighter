import { ModalOverlay, ModalContent, CloseButton, Content, Title, Text } from './Startpopup.styled';

const StartPopup = ({ onClose }: any) => {
  console.log('StartPopup');
  return (
    <ModalOverlay>
      <ModalContent>
        <Content>
          <Title>영업 시작 🚀</Title>
          <div>
            <Text>부산시 강서구 녹산산단 335로 7</Text>
            <Text>2023.11.08 오전 09:00</Text>
          </div>
        </Content>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StartPopup;
