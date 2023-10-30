import styled, { css } from 'styled-components';

const BoxContainer = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const lightgray = props.theme.colors.lightgray;
    return css`
      display: flex;
      flex-direction: column;
      background-color: ${lightgray};
      gap: 6px;

      height: calc(100vh - 210px);
      overflow-y: auto;

      padding-bottom: 100px;
    `;
  }};
`;

export { BoxContainer };
