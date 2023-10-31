import styled, { css } from 'styled-components';

const InputContainer = styled.div`
  margin: 10px 0;
`;

const StyledInput = styled.input.attrs<any>((props) => ({}))`
  ${(props) => {
    const light = props.theme.colors.light;
    const main = props.theme.colors.main;
    const gray = props.theme.colors.gray;
    const airfont = props.theme.fonts.air;
    return css`
      width: 100%;
      font-family: ${airfont};

      padding: 10px;
      font-size: 16px;
      border-radius: 10px;
      background-color: ${light};
      box-sizing: border-box;

      border: none;

      &::placeholder {
        color: ${gray};
        font-size: 14px;
      }
      &:focus {
        outline: 1px solid ${main};
      }
    `;
  }};
`;

export { InputContainer, StyledInput };
