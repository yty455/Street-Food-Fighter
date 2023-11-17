import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 11;

  width: 270px;
  height: 210px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Text = styled.div`
  font-size: 20px;
  text-align: center;
`;

const TimeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export { ModalContent, ModalOverlay, Text, TimeList };
