import styled, { css } from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  z-index: 1000;
  justify-content: center;
`;
const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  z-index: 110;

  width: 300px;
  height: 210px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CloseButton = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;

    return css`
      background-color: ${main};
      font-size: 20px;
      padding: 10px;
      border-radius: 0 0 10px 10px;
      text-align: center;

      height: 50px;
    `;
  }};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const Title = styled.div`
  font-size: 24px;
`;
const Text = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    return css`
      font-family: ${font};
      font-size: 18px;
      padding: 5px;
      text-align: center;
    `;
  }};
`;

export { ModalOverlay, ModalContent, CloseButton, Content, Title, Text };
