import styled, { css } from 'styled-components';
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 40px 20px;
  border-radius: 10px;
  width: 93vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.div`
  font-size: 28px;
`;

const Airfont = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const font = props.theme.fonts.air;
    const black = props.theme.colors.black;
    return css`
      font-family: ${font};
      color: ${black};
      font-size: 18px;
    `;
  }};
`;

const LevelBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  gap: 20px;
`;

const LevelTitle = styled.div`
  font-size: 24px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: space-around;
`;
export { Content, LevelBox, LevelTitle, ModalBackground, ModalContainer, Title, Airfont };
