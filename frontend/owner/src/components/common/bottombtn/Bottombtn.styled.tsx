import styled, { css } from 'styled-components';
const ButtonBox = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const main = props.theme.colors.main;
    const light = props.theme.colors.light;
    const gray = props.theme.colors.gray;

    const bgcolor = props.disabled ? gray : main;
    return css`
      display: flex;
      align-items: center;
      justify-content: center;

      background-color: ${bgcolor};
      color: ${light};

      position: fixed;
      bottom: 0;
      left: 0;

      width: 100%;
      height: 60px;

      font-size: 26px;
    `;
  }};
`;

export { ButtonBox };
