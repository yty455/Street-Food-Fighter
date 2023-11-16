import styled, { css } from 'styled-components';

const InputContainer = styled.div`
  margin: 3px 0;
  width: 100%;
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

const InfoLabel = styled.div.attrs<any>((props) => ({}))`
  ${(props) => {
    return css`
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
      box-sizing: border-box;
      border: none;
      font-size: 16px;
      /* margin-bottom: 16px; */
    `;
  }};
`;

const InfoInput = styled.input.attrs<any>((props) => ({}))`
  ${(props) => {
    const type = props.type;

    const white = props.theme.colors.white;
    const gray = props.theme.colors.gray;
    const black = props.theme.colors.black;
    const airfont = props.theme.fonts.air;
    const fontSize = '20px';
    const font = type === 'password' ? (props.value !== '' ? 'none' : props.theme.fonts.bold) : props.theme.fonts.bold;
    return css`
      width: 100%;
      margin-top: 10px;
      padding-bottom: 5px;
      font-size: ${fontSize};
      background-color: ${white};
      box-sizing: border-box;
      font-family: ${font};
      border: none;
      border-bottom: 1px solid ${black};
      &::placeholder {
        color: ${gray};
        font-size: ${fontSize};
      }
      &:focus {
        outline: none;
      }
    `;
  }};
`;

export { InputContainer, StyledInput, InfoLabel, InfoInput };
