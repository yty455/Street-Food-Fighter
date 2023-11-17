import styled, { css } from 'styled-components';

const ModalOverlay = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    return css`
      position: fixed;
      top: 0;
      left: 0;

      width: 100vw;
      height: 100vh;
      z-index: 1000;
      background-color: ${white};
    `;
  }};
`;

const ContentBox = styled.div`
  display: flex;
  padding: 50px 30px;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const TopContent = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-between;
  align-items: flex-end;
`;

const StyledButton = styled.div`
  width: 80vw;
  height: 35px;
`;

const SuccessContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;

  gap: 50px;
`;

const FinishText = styled.div`
  font-size: 22px;
  width: 80vw;
  text-align: center;
`;

const Topbar = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;

    return css`
      display: flex;
      background-color: ${white};
      width: 100%;
      align-items: center;
      padding: 15px;
      font-size: 20px;
      justify-content: space-between;
      box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.05);
    `;
  }};
`;

export { ModalOverlay, ContentBox, TopContent, Title, StyledButton, SuccessContentBox, FinishText, Topbar };
