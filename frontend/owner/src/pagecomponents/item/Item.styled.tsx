import styled, { css } from 'styled-components';

const Container = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;
    return css`
      display: flex;
      flex-direction: column;
      background-color: ${lightgray};
      height: 100vh;
      gap: 15px;
    `;
  }};
`;

export { Container };
