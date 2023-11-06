import styled, { css } from 'styled-components';

const InputContainer = styled.div`
  margin: 3px 0;
`;

const StyledInput = styled.input.attrs<any>((props) => ({}))`
  ${(props) => {
    const white = props.theme.colors.white;
    const gray = props.theme.colors.gray;
    const black = props.theme.colors.black;
    const airfont = props.theme.fonts.air;
    return css`
      width: 100%;
      font-family: ${airfont};

      font-size: 18px;
      background-color: ${white};
      box-sizing: border-box;

      border: none;
      border-bottom: 1px solid ${black};

      &::placeholder {
        color: ${gray};
        font-size: 14px;
      }
      &:focus {
        outline: none;
      }
    `;
  }};
`;

export { InputContainer, StyledInput };
