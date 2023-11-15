import styled, { css } from 'styled-components';

const BackButton = styled.div`
  position: absolute;
  left: 15px;
  width: 25px;
  height: 25px;
`;
const StyledTopbar = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    return css`
      display: flex;
      flex-direction: row;
      background-color: ${white};
      min-height: 55px;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      width: 100%;

      box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.05);
    `;
  }};
`;
const Text = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
`;

export { BackButton, StyledTopbar, Text };
