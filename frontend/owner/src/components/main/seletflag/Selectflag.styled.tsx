import styled, { css } from 'styled-components';

const Container = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    return css`
      display: flex;
      flex-direction: column;
      align-items: center;

      background-color: ${white};

      width: 100vw;
      height: 100vh;
      position: fixed;
      bottom: 0;
      z-index: 110;
    `;
  }};
`;

export { Container };
