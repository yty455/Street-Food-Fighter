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

      padding-bottom: 80px;
    `;
  }};
`;

const Putin = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;
    const white = props.theme.colors.white;
    return css`
      display: flex;
      align-items: center;
      justify-content: center;

      background-color: ${main};
      color: ${white};

      position: fixed;
      bottom: 0;
      left: 0;

      width: 100%;
      height: 50px;

      font-size: 20px;
    `;
  }};
`;

export { BoxContainer, Putin };
