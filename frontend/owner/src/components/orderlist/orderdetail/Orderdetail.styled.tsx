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
      z-index: 100;

      gap: 10px;
    `;
  }};
`;

export { Container };
