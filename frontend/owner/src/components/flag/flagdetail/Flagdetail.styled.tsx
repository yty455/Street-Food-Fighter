import styled, { css } from 'styled-components';

const Container = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const gray = props.theme.colors.lightgray;
    return css`
      display: flex;
      flex-direction: column;
      align-items: center;

      background-color: ${gray};

      width: 100vw;
      height: 100vh;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1;
    `;
  }};
`;

export { Container };
