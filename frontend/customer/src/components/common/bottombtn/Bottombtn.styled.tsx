import styled, { css } from 'styled-components';
const ButtonBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;
    const light = props.theme.colors.light;
    return css`
      display: flex;
      align-items: center;
      justify-content: center;

      background-color: ${main};
      color: ${light};

      position: fixed;
      bottom: 0;
      left: 0;

      width: 100%;
      height: 60px;

      font-size: 20px;
    `;
  }};
`;

export { ButtonBox };
