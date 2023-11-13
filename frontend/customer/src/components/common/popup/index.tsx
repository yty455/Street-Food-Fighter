import { ModalOverlay, ModalContent, CloseButton, Content, Title, Text } from './Popup.styled';
const Popup = ({ onClose, title, content, closeText }: any) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <Content>
          <Title>{title}</Title>
          <Text>{content}</Text>
        </Content>
        <CloseButton onClick={onClose}>{closeText}</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Popup;
