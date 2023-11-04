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
export { ModalOverlay, ContentBox, TopContent, Title };
