import styled, { css } from 'styled-components';

const BackButton = styled.div`
  position: absolute;
  left: 15px;
  width: 30px;
  height: 30px;
`;
const StyledTopbar = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    const lightgray = props.theme.colors.gray;
    return css`
      display: flex;
      flex-direction: row;
      background-color: ${white};
      height: 55px;
      align-items: center;
      justify-content: center;

      font-size: 24px;
      width: 100%;

      box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.05);
    `;
  }};
`;
const Text = styled.div`
  width: 100%;
  text-align: center;
`;

export { BackButton, StyledTopbar, Text };
