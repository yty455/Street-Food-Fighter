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

      /* padding: 20px; */
    `;
  }};
`;
export { ModalOverlay };
