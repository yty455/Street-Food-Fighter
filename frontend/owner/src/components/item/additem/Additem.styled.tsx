import styled, { css } from 'styled-components';

const Container = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    return css`
      display: flex;
      background-color: ${white};

      width: 100vw;
      height: 100vh;
      position: fixed;
      z-index: 1;
    `;
  }};
`;

export { Container };
