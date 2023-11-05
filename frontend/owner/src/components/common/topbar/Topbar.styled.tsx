import styled, { css } from 'styled-components';

const BackButton = styled.div`
  display: flex;
  width: 40%;
  padding-left: 20px;
`;
const StyledTopbar = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    return css`
      display: flex;
      flex-direction: row;
      background-color: ${white};
      height: 55px;
      align-items: center;
      justify-content: flex-start;

      font-size: 24px;
    `;
  }};
`;

export { BackButton, StyledTopbar };
